import { useTheme } from '@/context/theme-context';
import { Tabs } from 'expo-router';
import { History, Home, PlusCircle, Settings } from 'lucide-react-native';

export default function TabLayout() {
  const { isDarkMode } = useTheme();

  const bgColor = isDarkMode ? '#121212' : '#F5F5F5';
  const textColor = isDarkMode ? '#fff' : '#121212';
  const tabBg = isDarkMode ? '#1E1E1E' : '#FFFFFF';
  const inactiveColor = isDarkMode ? '#888' : '#999';

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerStyle: { 
          backgroundColor: bgColor, 
          elevation: 0, 
          shadowOpacity: 0 
        },
        headerTintColor: textColor,
        tabBarStyle: {
          backgroundColor: tabBg,
          borderTopWidth: 0,
          elevation: 10,
          shadowOpacity: 0.1,
          height: 65,
          paddingBottom: 10,
        },
        tabBarActiveTintColor: '#00D084',
        tabBarInactiveTintColor: inactiveColor,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => <Home color={color} size={28} />,
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: 'Agregar',
          tabBarIcon: ({ color }) => <PlusCircle color={color} size={28} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'Historial',
          tabBarIcon: ({ color }) => <History color={color} size={28} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Configuración',
          tabBarIcon: ({ color }) => <Settings color={color} size={28} />,
        }}
      />
    </Tabs>
  );
}
