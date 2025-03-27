from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.contrib.auth.hashers import make_password, check_password
from cloudinary.models import CloudinaryField

class UserAccountManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Email field is required")

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)  # Hash password
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(email, password, **extra_fields)

class UserAccount(AbstractBaseUser, PermissionsMixin):  # ✅ Extend AbstractBaseUser
    class Role(models.TextChoices):
        CIVILIAN = 'CIVILIAN', 'Civilian'
        ADMIN = 'ADMIN', 'Village Authority Admin'

    class DocumentType(models.TextChoices):
        AADHAAR = 'AADHAAR', 'Aadhaar Card'
        VOTER_ID = 'VOTER_ID', 'Voter ID'
        PAN = 'PAN', 'PAN Card'
        DRIVING_LICENSE = 'DRIVING_LICENSE', 'Driving License'
        PASSPORT = 'PASSPORT', 'Passport'
        RATION_CARD = 'RATION_CARD', 'Ration Card'
        OTHER = 'OTHER', 'Other'

    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15)
    address = models.TextField()
    password = models.CharField(max_length=128)
    role = models.CharField(max_length=20, choices=Role.choices)
    registration_step = models.PositiveSmallIntegerField(default=1)
    is_active = models.BooleanField(default=True)  # ✅ Users should be active by default
    is_staff = models.BooleanField(default=False)  # ✅ Required for admin access

    # Document fields
    id_proof_type = models.CharField(max_length=20, choices=DocumentType.choices, blank=True)
    id_proof_file = CloudinaryField('id_proofs', folder='authentication/id_proofs', blank=True)

    # Authority-specific fields
    authority_position = models.CharField(max_length=100, blank=True)
    government_id = models.CharField(max_length=150, blank=True)
    department_name = models.CharField(max_length=150, blank=True)
    work_location = models.CharField(max_length=150, blank=True)

    # Civilian-specific fields
    occupation = models.CharField(max_length=100, blank=True)
    family_members = models.PositiveIntegerField(null=True, blank=True)

    objects = UserAccountManager()  # ✅ Custom user manager

    USERNAME_FIELD = "email"  # ✅ Use email for authentication
    REQUIRED_FIELDS = ["first_name", "last_name", "phone", "role"]  # ✅ Avoid AttributeError

    def set_password(self, raw_password):
        self.password = make_password(raw_password)

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)

    def __str__(self):
        return self.email
