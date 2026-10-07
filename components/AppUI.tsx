import { Link, usePathname } from 'expo-router';
import React, { useState } from 'react';
import { Image, ImageBackground, ImageSourcePropType, Linking, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, contact } from '../src/theme';

const menuItems = [
  ['Home', '/'], ['About', '/about'], ['Courses', '/courses'], ['Request a booking', '/request'],
  ['Quote review', '/quote'], ['Venue & directions', '/venue'], ['Safety & preparation', '/safety'], ['Gallery', '/gallery'], ['FAQs', '/faq'], ['Contact', '/contact'],
] as const;

export function Page({ children, title, eyebrow, dark = false }: React.PropsWithChildren<{ title: string; eyebrow?: string; dark?: boolean }>) {
  return (
    <SafeAreaView style={[styles.safe, dark && styles.safeDark]} edges={['top', 'left', 'right']}>
      <Header dark={dark} />
      <ScrollView contentContainerStyle={styles.page} keyboardShouldPersistTaps="handled">
        {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
        <Text style={[styles.pageTitle, dark && styles.lightText]}>{title}</Text>
        {children}
        <View style={styles.footer}>
          <Text style={styles.footerText}>SME ADVENTURES  ·  GET OUT THERE</Text>
          <Pressable onPress={() => Linking.openURL(`tel:${contact.phone}`)}><Text style={styles.footerLink}>{contact.phone}</Text></Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export function Header({ dark = false }: { dark?: boolean }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <View style={[styles.header, dark && styles.headerDark]}>
      <Link href="/" asChild><Pressable accessibilityLabel="Adventure Escape SA home"><Image source={require('../assets/images/adventure-escape-logo.png')} accessibilityLabel="Adventure Escape SA" resizeMode="contain" style={styles.logo} /></Pressable></Link>
      <Pressable accessibilityRole="button" accessibilityLabel="Open navigation" onPress={() => setOpen(!open)} style={[styles.menuButton, dark && styles.menuButtonDark]}>
        <Text style={[styles.menuButtonText, dark && styles.lightText]}>{open ? 'CLOSE  ×' : 'MENU  ▾'}</Text>
      </Pressable>
      {open ? <View style={styles.dropdown}>
        {menuItems.map(([label, href]) => <Link href={href as never} asChild key={href}>
          <Pressable onPress={() => setOpen(false)} style={[styles.menuItem, pathname === href && styles.menuItemActive]}><Text style={[styles.menuItemText, pathname === href && styles.menuItemTextActive]}>{label}</Text></Pressable>
        </Link>)}
      </View> : null}
    </View>
  );
}

export function Button({ label, href, onPress, secondary = false, compact = false }: { label: string; href?: string; onPress?: () => void; secondary?: boolean; compact?: boolean }) {
  const content = <View style={[styles.button, secondary && styles.buttonSecondary, compact && styles.buttonCompact]}><Text style={[styles.buttonText, secondary && styles.buttonTextSecondary]}>{label}</Text><Text style={[styles.buttonArrow, secondary && styles.buttonTextSecondary]}>↗</Text></View>;
  if (href) return <Link href={href as never} asChild><Pressable>{content}</Pressable></Link>;
  return <Pressable onPress={onPress}>{content}</Pressable>;
}

export function Photo({ uri, height = 230, children }: React.PropsWithChildren<{ uri: ImageSourcePropType | string; height?: number }>) {
  const source = typeof uri === 'string' ? { uri } : uri;
  return <ImageBackground source={source} imageStyle={styles.photoImage} style={[styles.photo, { height }]}>{children}</ImageBackground>;
}

export function SectionLabel({ children }: React.PropsWithChildren) { return <Text style={styles.sectionLabel}>{children}</Text>; }

export function Body({ children, light = false }: React.PropsWithChildren<{ light?: boolean }>) { return <Text style={[styles.body, light && styles.bodyLight]}>{children}</Text>; }

export function Field({ label, value, onChangeText, placeholder, keyboardType, multiline, error, autoCapitalize }: {
  label: string; value: string; onChangeText: (value: string) => void; placeholder?: string; keyboardType?: 'default' | 'email-address' | 'phone-pad' | 'numeric'; multiline?: boolean; error?: string; autoCapitalize?: 'none' | 'sentences' | 'words';
}) {
  return <View style={styles.fieldWrap}>
    <Text style={styles.fieldLabel}>{label}</Text>
    <TextInput value={value} onChangeText={onChangeText} placeholder={placeholder} placeholderTextColor={colors.muted} keyboardType={keyboardType} multiline={multiline} autoCapitalize={autoCapitalize} style={[styles.input, multiline && styles.inputMultiline, error && styles.inputError]} />
    {error ? <Text style={styles.errorText}>{error}</Text> : null}
  </View>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.paper }, safeDark: { backgroundColor: colors.espresso },
  header: { height: 62, paddingHorizontal: 22, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.paper, zIndex: 20 },
  headerDark: { backgroundColor: colors.espresso }, logo: { width: 94, height: 56 },
  menuButton: { borderWidth: 1, borderColor: colors.line, paddingVertical: 10, paddingHorizontal: 13, borderRadius: 4 }, menuButtonDark: { borderColor: '#66534D' }, menuButtonText: { fontSize: 11, fontWeight: '800', color: colors.espresso, letterSpacing: 0.5 },
  dropdown: { position: 'absolute', right: 16, top: 56, width: 230, paddingVertical: 7, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.line, borderRadius: 4, shadowColor: colors.black, shadowOpacity: 0.18, shadowRadius: 12, elevation: 10 },
  menuItem: { paddingHorizontal: 16, paddingVertical: 12 }, menuItemActive: { backgroundColor: '#FCE6DC' }, menuItemText: { color: colors.espresso, fontWeight: '600', fontSize: 14 }, menuItemTextActive: { color: colors.orange },
  page: { paddingHorizontal: 22, paddingTop: 28, paddingBottom: 38 }, eyebrow: { color: colors.orange, fontSize: 11, fontWeight: '900', letterSpacing: 1.7, marginBottom: 10 }, pageTitle: { color: colors.espresso, fontSize: 34, lineHeight: 39, fontWeight: '900', marginBottom: 19 }, lightText: { color: colors.paper },
  body: { color: colors.muted, fontSize: 15, lineHeight: 24 }, bodyLight: { color: colors.stone }, sectionLabel: { color: colors.orange, fontSize: 11, fontWeight: '900', letterSpacing: 1.4, marginTop: 20, marginBottom: 11 },
  button: { backgroundColor: colors.orange, borderRadius: 4, paddingVertical: 15, paddingHorizontal: 17, minHeight: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 13 }, buttonSecondary: { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.espresso }, buttonCompact: { paddingVertical: 10, minHeight: 42, marginTop: 8 }, buttonText: { color: colors.black, fontSize: 13, fontWeight: '900' }, buttonTextSecondary: { color: colors.espresso }, buttonArrow: { fontSize: 18, fontWeight: '700', color: colors.black },
  photo: { width: '100%', justifyContent: 'flex-end', padding: 18, marginVertical: 12, overflow: 'hidden', backgroundColor: colors.stone }, photoImage: { borderRadius: 4 },
  fieldWrap: { marginBottom: 15 }, fieldLabel: { color: colors.espresso, fontSize: 12, fontWeight: '800', marginBottom: 7 }, input: { minHeight: 48, borderWidth: 1, borderColor: colors.line, borderRadius: 4, paddingHorizontal: 13, color: colors.black, backgroundColor: colors.white, fontSize: 15 }, inputMultiline: { minHeight: 100, paddingTop: 12, textAlignVertical: 'top' }, inputError: { borderColor: colors.danger }, errorText: { color: colors.danger, fontSize: 12, marginTop: 5 },
  footer: { marginTop: 35, paddingTop: 18, borderTopWidth: 1, borderTopColor: colors.line, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, footerText: { color: colors.muted, fontSize: 9, fontWeight: '900', letterSpacing: 1 }, footerLink: { color: colors.orange, fontSize: 12, fontWeight: '800' },
});