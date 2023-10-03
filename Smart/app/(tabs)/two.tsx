import React from 'react';
import { StyleSheet, View, Text, Switch, TouchableOpacity } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

export default function TabTwoScreen() {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const toggleNotifications = () => {
    setNotificationsEnabled((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Dark Mode</Text>
        <Switch
          value={isDarkMode}
          onValueChange={toggleDarkMode}
          trackColor={{ false: "#767577", true: "red" }}
          thumbColor={isDarkMode ? "red" : "#f4f3f4"}
        />
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={toggleNotifications}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={notificationsEnabled ? "#f5dd4b" : "#f4f3f4"}
        />
      </View>
      <View style={styles.settingItem}>
        </View>
      <TouchableOpacity
        style={styles.editProfileButton}
        onPress={() => {
          // Lógica para abrir a tela de edição de perfil
        }}
      >
        <Text style={styles.editProfileButtonText}>Edit profile</Text>
        <FontAwesomeIcon name="pencil" size={20} color="white" style={styles.editProfileIcon} />
      </TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },
  settingLabel: {
    fontSize: 18,
  },
  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  editProfileButtonText: {
    color: 'white',
    fontSize: 18,
    marginRight: 10,
  },
  editProfileIcon: {
    marginRight: 5,
  },

});
