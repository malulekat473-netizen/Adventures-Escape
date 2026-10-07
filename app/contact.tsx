import { Linking, Pressable, StyleSheet, Text } from 'react-native';
import { Button, Body, Page, SectionLabel } from '../components/AppUI';
import { colors, contact } from '../src/theme';

export default function ContactScreen() {
  return <Page title="Let’s talk outside." eyebrow="CONTACT SME ADVENTURES">
    <Body>Questions about a course, group size or your booking request? Reach us directly and we’ll help you plan the day.</Body>
    <SectionLabel>PHONE</SectionLabel>
    <Pressable accessibilityRole="link" onPress={() => Linking.openURL(`tel:${contact.phone}`)} style={styles.contactRow}><Text style={styles.contactValue}>{contact.phone}</Text><Text style={styles.action}>CALL ↗</Text></Pressable>
    <SectionLabel>EMAIL</SectionLabel>
    <Pressable accessibilityRole="link" onPress={() => Linking.openURL(`mailto:${contact.email}`)} style={styles.contactRow}><Text style={styles.email}>{contact.email}</Text><Text style={styles.action}>EMAIL ↗</Text></Pressable>
    <SectionLabel>FIND THE VENUE</SectionLabel>
    <Body>Final meeting instructions are confirmed with your booking details.</Body>
    <Button label="OPEN DIRECTIONS" href="/venue" />
    <Button label="SEND A BOOKING REQUEST" href="/request" secondary />
  </Page>;
}

const styles = StyleSheet.create({ contactRow: { minHeight: 54, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.white, borderRadius: 4 }, contactValue: { fontSize: 19, fontWeight: '900', color: colors.espresso }, email: { fontSize: 14, fontWeight: '800', color: colors.espresso }, action: { color: colors.orange, fontSize: 10, fontWeight: '900' } });