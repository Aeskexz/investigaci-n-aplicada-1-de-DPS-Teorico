import { useTheme } from '@/context/theme-context';
import { Moon, Sun } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import Animated, {
    FadeInUp,
    interpolateColor,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';

export default function SettingsScreen() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  
  const toggleAnimValue = useSharedValue(isDarkMode ? 1 : 0);
  
  const handleToggleDarkMode = () => {
    const newValue = isDarkMode ? 0 : 1;
    
    toggleAnimValue.value = withSpring(newValue, {
      damping: 8,
      mass: 1,
      overshootClamping: false,
    });

    toggleDarkMode();
  };
  
  const animatedBackgroundColor = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      toggleAnimValue.value,
      [0, 1],
      ['#FFFFFF', '#121212'],
      'RGB'
    );
    return {
      backgroundColor,
    };
  });

  const animatedToggleStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: 1 + toggleAnimValue.value * 0.1 }],
      opacity: 0.8 + toggleAnimValue.value * 0.2,
    };
  });

  return (
    <Animated.View style={[styles.container, animatedBackgroundColor]}>
      <Animated.View
        entering={FadeInUp.delay(100).springify()}
        style={styles.contentContainer}
      >
        <Text style={[styles.title, { color: isDarkMode ? '#FFF' : '#121212' }]}>
          Configuración y Apariencia
        </Text>

        {/* Theme Toggle Card */}
        <Animated.View
          entering={FadeInUp.delay(200).springify()}
          style={[
            styles.settingCard,
            { backgroundColor: isDarkMode ? '#1E1E1E' : '#F5F5F5' },
          ]}
        >
          <View style={styles.settingHeader}>
            <View style={styles.iconTitleContainer}>
              {isDarkMode ? (
                <Moon color="#00D084" size={28} />
              ) : (
                <Sun color="#FFA500" size={28} />
              )}
              <View style={styles.titleContainer}>
                <Text style={[styles.settingTitle, { color: isDarkMode ? '#FFF' : '#121212' }]}>
                  Modo Oscuro
                </Text>
                <Text style={[styles.settingDescription, { color: isDarkMode ? '#888' : '#666' }]}>
                  Reduce la fatiga ocular
                </Text>
              </View>
            </View>

            <Animated.View style={animatedToggleStyle}>
              <Switch
                value={isDarkMode}
                onValueChange={handleToggleDarkMode}
                trackColor={{ false: '#CCC', true: '#00D084' }}
                thumbColor={isDarkMode ? '#00D084' : '#FFF'}
                ios_backgroundColor="#CCC"
              />
            </Animated.View>
          </View>
        </Animated.View>

        {/* Info Section */}
        <Animated.View
          entering={FadeInUp.delay(300).springify()}
          style={[
            styles.infoCard,
            { backgroundColor: isDarkMode ? '#1E1E1E' : '#F5F5F5' },
          ]}
        >
          <Text style={[styles.infoTitle, { color: isDarkMode ? '#FFF' : '#121212' }]}>
            Estado Actual
          </Text>
          <Text style={[styles.infoText, { color: isDarkMode ? '#888' : '#666' }]}>
            Tema: {isDarkMode ? '🌙 Oscuro' : '☀️ Claro'}
          </Text>
          <Text style={[styles.infoSubtext, { color: isDarkMode ? '#666' : '#999' }]}>
            Las animaciones de transición se aplican suavemente con Reanimated
          </Text>
        </Animated.View>

        {/* Animation Info */}
        <Animated.View
          entering={FadeInUp.delay(400).springify()}
          style={styles.animationInfo}
        >
          <Text style={[styles.smallText, { color: isDarkMode ? '#666' : '#999' }]}>
            ✨ Animaciones activadas durante la transición de tema
          </Text>
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  settingCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  settingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  titleContainer: {
    marginLeft: 15,
    flex: 1,
  },
  settingTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
  },
  infoCard: {
    borderRadius: 20,
    padding: 20,
    marginTop: 10,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#00D084',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '500',
  },
  infoSubtext: {
    fontSize: 12,
    lineHeight: 18,
  },
  animationInfo: {
    alignItems: 'center',
    paddingTop: 20,
  },
  smallText: {
    fontSize: 12,
    textAlign: 'center',
  },
});
