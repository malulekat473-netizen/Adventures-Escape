import { Linking, Pressable, StyleSheet, Text } from 'react-native';
import { Button, Body, Page, Photo, SectionLabel } from '../components/AppUI';
import { colors, contact } from '../src/theme';

export default function VenueScreen() {
  return <Page title="Meet us out there." eyebrow="VENUE & DIRECTIONS">
    <Photo uri="https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1200&q=85" height={280} />
    <Body>Our outdoor experiences take place in natural settings. Exact meeting point and arrival details are shared when your booking request is confirmed.</Body>
    <SectionLabel>OPEN DIRECTIONS</SectionLabel>
    <Pressable accessibilityRole="link" onPress={() => Linking.openURL(contact.directions)} style={styles.mapLink}><Text style={styles.mapIcon}>↗</Text><Text style={styles.mapText}>Open venue directions in Google Maps</Text></Pressable>
    <Text style={styles.small}>Map link: maps.app.goo.gl/QhLLXGd2u14aw6LY6</Text>
    <Button label="ASK ABOUT ARRIVAL" href="/contact" secondary />
  </Page>;
}

const styles = StyleSheet.create({ mapLink: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.orange, borderRadius: 4, padding: 16 }, mapIcon: { fontSize: 19, fontWeight: '900', marginRight: 13, color: colors.black }, mapText: { flex: 1, color: colors.black, fontSize: 14, fontWeight: '900' }, small: { color: colors.muted, fontSize: 11, marginTop: 8 } });