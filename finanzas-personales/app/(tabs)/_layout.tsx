import { Tabs } from 'expo-router';
import { Home, PlusCircle, History, Settings } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: '#121212', elevation: 0, shadowOpacity: 0 },
        headerTintColor: '#fff',
        tabBarStyle: {
          backgroundColor: '#1E1E1E',
          borderTopWidth: 0,
          elevation: 10,
          shadowOpacity: 0.1,
          height: 65,
          paddingBottom: 10,
        },
        tabBarActiveTintColor: '#00D084',
        tabBarInactiveTintColor: '#888',
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
