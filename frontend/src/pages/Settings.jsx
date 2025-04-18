import React, { useState } from "react";
import { 
  FiSettings, 
  FiUser, 
  FiShield, 
  FiBell,
  FiMail,
  FiDatabase,
  FiSave,
  FiLock,
  FiUsers,
  FiGlobe,
  FiAlertCircle
} from "react-icons/fi";
import { motion } from "framer-motion";

const Settings = () => {
  // Settings state
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({
    profile: {
      name: "Admin User",
      email: "admin@civicpolicy.gov",
      role: "Administrator",
      department: "Policy Management",
      phone: "+1 (555) 123-4567"
    },
    security: {
      twoFactorEnabled: true,
      passwordLastChanged: "2023-10-15",
      sessionTimeout: 30,
      loginAlerts: true
    },
    notifications: {
      email: true,
      push: false,
      feedbackUpdates: true,
      policyChanges: true,
      weeklyDigest: true
    },
    system: {
      dataRetention: 365,
      backupFrequency: "daily",
      apiAccess: false,
      analyticsEnabled: true
    }
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Handle form changes
  const handleChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  // Save settings
  const saveSettings = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1500);
  };

  // Tabs configuration
  const tabs = [
    { id: "profile", icon: <FiUser />, label: "Profile" },
    { id: "security", icon: <FiShield />, label: "Security" },
    { id: "notifications", icon: <FiBell />, label: "Notifications" },
    { id: "system", icon: <FiSettings />, label: "System" }
  ];

  return (
    <div className="p-6 bg-gray-950 text-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">System Settings</h1>
          <p className="text-gray-400">Configure portal preferences and security</p>
        </div>
        <div className="mt-4 md:mt-0">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={saveSettings}
            disabled={isSaving}
            className={`flex items-center px-4 py-2 rounded-lg text-sm transition-colors ${
              isSaving ? 'bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            <FiSave className="mr-2" />
            {isSaving ? "Saving..." : "Save Settings"}
          </motion.button>
          {saveSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-green-400 text-sm flex items-center"
            >
              <FiCheckCircle className="mr-1" /> Settings saved successfully!
            </motion.div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:w-64 bg-gray-900 rounded-xl border border-gray-800 p-4">
          <nav className="space-y-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center px-4 py-3 rounded-lg text-sm transition-colors ${
                  activeTab === tab.id 
                    ? 'bg-blue-500/20 text-blue-400' 
                    : 'text-gray-400 hover:bg-gray-800'
                }`}
              >
                <span className="mr-3">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>

          {/* System Info */}
          <div className="mt-8 pt-6 border-t border-gray-800">
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">System Information</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex justify-between">
                <span>Version</span>
                <span className="text-gray-300">v2.4.1</span>
              </div>
              <div className="flex justify-between">
                <span>Last Updated</span>
                <span className="text-gray-300">2023-11-05</span>
              </div>
              <div className="flex justify-between">
                <span>Storage</span>
                <span className="text-gray-300">1.2GB / 5GB</span>
              </div>
            </div>
          </div>
        </div>

        {/* Settings Content */}
        <div className="flex-1 bg-gray-900 rounded-xl border border-gray-800 p-6">
          {/* Profile Settings */}
          {activeTab === "profile" && (
            <div>
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                <FiUser className="mr-2" /> Profile Settings
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={formData.profile.name}
                    onChange={(e) => handleChange("profile", "name", e.target.value)}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={formData.profile.email}
                    onChange={(e) => handleChange("profile", "email", e.target.value)}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Role</label>
                  <input
                    type="text"
                    value={formData.profile.role}
                    disabled
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-400 cursor-not-allowed"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Department</label>
                  <select
                    value={formData.profile.department}
                    onChange={(e) => handleChange("profile", "department", e.target.value)}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  >
                    <option value="Policy Management">Policy Management</option>
                    <option value="Public Relations">Public Relations</option>
                    <option value="IT Services">IT Services</option>
                    <option value="Administration">Administration</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.profile.phone}
                    onChange={(e) => handleChange("profile", "phone", e.target.value)}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === "security" && (
            <div>
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                <FiShield className="mr-2" /> Security Settings
              </h2>
              
              <div className="space-y-6">
                <div className="p-5 bg-gray-800/50 rounded-lg border border-gray-700">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-white flex items-center">
                      <FiLock className="mr-2" /> Two-Factor Authentication
                    </h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.security.twoFactorEnabled}
                        onChange={(e) => handleChange("security", "twoFactorEnabled", e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <p className="text-sm text-gray-400">
                    Add an extra layer of security to your account. When enabled, you'll be required to enter a verification code from your authenticator app when signing in.
                  </p>
                </div>
                
                <div className="p-5 bg-gray-800/50 rounded-lg border border-gray-700">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-white flex items-center">
                      <FiAlertCircle className="mr-2" /> Login Alerts
                    </h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.security.loginAlerts}
                        onChange={(e) => handleChange("security", "loginAlerts", e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <p className="text-sm text-gray-400">
                    Receive email notifications when your account is accessed from a new device or location.
                  </p>
                </div>
                
                <div className="p-5 bg-gray-800/50 rounded-lg border border-gray-700">
                  <h3 className="font-medium text-white mb-3 flex items-center">
                    <FiClock className="mr-2" /> Session Timeout
                  </h3>
                  <div className="flex items-center gap-4">
                    <select
                      value={formData.security.sessionTimeout}
                      onChange={(e) => handleChange("security", "sessionTimeout", parseInt(e.target.value))}
                      className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    >
                      <option value={15}>15 minutes</option>
                      <option value={30}>30 minutes</option>
                      <option value={60}>1 hour</option>
                      <option value={120}>2 hours</option>
                      <option value={0}>Never (not recommended)</option>
                    </select>
                    <p className="text-sm text-gray-400">
                      Automatically log out after period of inactivity.
                    </p>
                  </div>
                </div>
                
                <div className="p-5 bg-gray-800/50 rounded-lg border border-gray-700">
                  <h3 className="font-medium text-white mb-3 flex items-center">
                    <FiUsers className="mr-2" /> Password Information
                  </h3>
                  <div className="space-y-2 text-sm text-gray-400">
                    <div className="flex justify-between">
                      <span>Last Changed</span>
                      <span className="text-gray-300">{formData.security.passwordLastChanged}</span>
                    </div>
                    <button className="mt-3 px-4 py-2 text-blue-400 hover:text-blue-300 text-sm bg-blue-500/10 rounded-lg">
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === "notifications" && (
            <div>
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                <FiBell className="mr-2" /> Notification Preferences
              </h2>
              
              <div className="space-y-6">
                <div className="p-5 bg-gray-800/50 rounded-lg border border-gray-700">
                  <h3 className="font-medium text-white mb-4">Notification Methods</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-white flex items-center">
                          <FiMail className="mr-2" /> Email Notifications
                        </h4>
                        <p className="text-xs text-gray-400 mt-1">
                          Receive notifications via your registered email address
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.notifications.email}
                          onChange={(e) => handleChange("notifications", "email", e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-white">Push Notifications</h4>
                        <p className="text-xs text-gray-400 mt-1">
                          Receive notifications on your mobile device (requires app)
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.notifications.push}
                          onChange={(e) => handleChange("notifications", "push", e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="p-5 bg-gray-800/50 rounded-lg border border-gray-700">
                  <h3 className="font-medium text-white mb-4">Notification Types</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-white">Feedback Updates</h4>
                        <p className="text-xs text-gray-400 mt-1">
                          Notify me when feedback I've interacted with is updated
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.notifications.feedbackUpdates}
                          onChange={(e) => handleChange("notifications", "feedbackUpdates", e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-white">Policy Changes</h4>
                        <p className="text-xs text-gray-400 mt-1">
                          Notify me when policies I follow are updated
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.notifications.policyChanges}
                          onChange={(e) => handleChange("notifications", "policyChanges", e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-white">Weekly Digest</h4>
                        <p className="text-xs text-gray-400 mt-1">
                          Receive a weekly summary of activity
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.notifications.weeklyDigest}
                          onChange={(e) => handleChange("notifications", "weeklyDigest", e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* System Settings */}
          {activeTab === "system" && (
            <div>
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                <FiSettings className="mr-2" /> System Configuration
              </h2>
              
              <div className="space-y-6">
                <div className="p-5 bg-gray-800/50 rounded-lg border border-gray-700">
                  <h3 className="font-medium text-white mb-4">Data Management</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-white flex items-center">
                          <FiDatabase className="mr-2" /> Data Retention Period
                        </h4>
                        <p className="text-xs text-gray-400 mt-1">
                          How long to keep feedback data before automatic anonymization
                        </p>
                      </div>
                      <select
                        value={formData.system.dataRetention}
                        onChange={(e) => handleChange("system", "dataRetention", parseInt(e.target.value))}
                        className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                      >
                        <option value={30}>30 days</option>
                        <option value={90}>90 days</option>
                        <option value={180}>6 months</option>
                        <option value={365}>1 year</option>
                        <option value={730}>2 years</option>
                        <option value={0}>Indefinitely</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-white">Backup Frequency</h4>
                        <p className="text-xs text-gray-400 mt-1">
                          How often to create system backups
                        </p>
                      </div>
                      <select
                        value={formData.system.backupFrequency}
                        onChange={(e) => handleChange("system", "backupFrequency", e.target.value)}
                        className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                      >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="p-5 bg-gray-800/50 rounded-lg border border-gray-700">
                  <h3 className="font-medium text-white mb-4">System Features</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-white">API Access</h4>
                        <p className="text-xs text-gray-400 mt-1">
                          Enable external API access for integrations
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.system.apiAccess}
                          onChange={(e) => handleChange("system", "apiAccess", e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-white">Analytics Collection</h4>
                        <p className="text-xs text-gray-400 mt-1">
                          Enable usage analytics to help improve the system
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.system.analyticsEnabled}
                          onChange={(e) => handleChange("system", "analyticsEnabled", e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="p-5 bg-gray-800/50 rounded-lg border border-gray-700">
                  <h3 className="font-medium text-white mb-4 flex items-center">
                    <FiGlobe className="mr-2" /> Regional Settings
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Time Zone</label>
                      <select
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                      >
                        <option>UTC-05:00 Eastern Time (US & Canada)</option>
                        <option>UTC-06:00 Central Time (US & Canada)</option>
                        <option>UTC-07:00 Mountain Time (US & Canada)</option>
                        <option>UTC-08:00 Pacific Time (US & Canada)</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Date Format</label>
                      <select
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                      >
                        <option>MM/DD/YYYY (12/31/2023)</option>
                        <option>DD/MM/YYYY (31/12/2023)</option>
                        <option>YYYY-MM-DD (2023-12-31)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;