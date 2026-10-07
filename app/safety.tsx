import { StyleSheet, Text, View } from 'react-native';
import { Body, Button, Page, SectionLabel } from '../components/AppUI';
import { colors } from '../src/theme';

const preparation = [
  'Wear comfortable outdoor clothing and closed-toe shoes suited to the activity.',
  'Bring drinking water and dress for the weather. Check your messages for any course-specific items.',
  'Share access requirements or relevant health considerations in your booking request.',
];

const onTheDay = [
  'Arrive at the confirmed meeting point at the time shared by the team.',
  'Listen to your guide’s safety briefing and ask questions before the activity starts.',
  'Stay with your group and follow your guide’s instructions throughout the experience.',
  'Tell your guide promptly if you feel unwell, become injured, or need assistance.',
];

function Checklist({ items }: { items: string[] }) {
  return <View style={styles.list}>
    {items.map((item, index) => <View key={item} style={styles.row}>
      <Text style={styles.number}>{String(index + 1).padStart(2, '0')}</Text>
      <Text style={styles.item}>{item}</Text>
    </View>)}
  </View>;
}

export default function SafetyScreen() {
  return <Page title="Get ready for the outdoors." eyebrow="SAFETY & PREPARATION">
    <Body>Every activity is different. Your team will confirm the meeting details and any course-specific preparation after reviewing your request.</Body>
    <SectionLabel>BEFORE YOU ARRIVE</SectionLabel>
    <Checklist items={preparation} />
    <SectionLabel>ON THE DAY</SectionLabel>
    <Checklist items={onTheDay} />
    <Text style={styles.note}>Outdoor conditions can change. Contact our team if you have questions about your activity or need to update the information in your request.</Text>
    <Button label="VIEW VENUE & DIRECTIONS" href="/venue" secondary />
    <Button label="SEND A BOOKING REQUEST" href="/request" />
  </Page>;
}

const styles = StyleSheet.create({
  list: { borderTopWidth: 1, borderColor: colors.line },
  row: { flexDirection: 'row', gap: 14, paddingVertical: 14, borderBottomWidth: 1, borderColor: colors.line },
  number: { width: 25, color: colors.orange, fontSize: 11, fontWeight: '900' },
  item: { flex: 1, color: colors.espresso, fontSize: 14, lineHeight: 21 },
  note: { marginTop: 20, padding: 14, backgroundColor: colors.tan, color: colors.espresso, fontSize: 12, lineHeight: 19 },
});