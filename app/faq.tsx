import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Button, Page } from '../components/AppUI';
import { colors } from '../src/theme';

const faqs = [
  ['Is my booking confirmed when I submit the form?', 'No. Submitting sends a request for follow-up only. Our team will confirm availability, meeting details and final pricing with you.'],
  ['What should I bring?', 'Wear comfortable outdoor clothing and closed shoes. Course-specific preparation and any personal items will be shared when your details are confirmed.'],
  ['Are safety instructions included?', 'Yes. Each activity includes the relevant safety briefing and equipment listed on its course detail page. Follow your guide’s instructions throughout the experience.'],
  ['Can I request a group or corporate booking?', 'Yes. Select the Corporate Team Challenge or describe your group in the request form and we will follow up.'],
  ['How are the displayed totals calculated?', 'The estimate uses your selected per-person course fees, applies the discount percentage you set, then calculates VAT at 15% on the discounted subtotal. It is a non-formal estimate only.'],
  ['How do I get directions?', 'Use the Venue & Directions page to open the shared Google Maps link. Final arrival instructions are confirmed by our team.'],
];

export default function FAQScreen() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return <Page title="Good questions." eyebrow="FREQUENTLY ASKED">
    {faqs.map(([question, answer], index) => <View key={question} style={styles.item}>
      <Pressable accessibilityRole="button" accessibilityState={{ expanded: openIndex === index }} onPress={() => setOpenIndex(openIndex === index ? null : index)} style={styles.questionRow}>
        <Text style={styles.question}>{question}</Text><Text style={styles.toggle}>{openIndex === index ? '−' : '+'}</Text>
      </Pressable>
      {openIndex === index ? <Text style={styles.answer}>{answer}</Text> : null}
    </View>)}
    <Button label="STILL HAVE A QUESTION?" href="/contact" />
  </Page>;
}

const styles = StyleSheet.create({ item: { paddingVertical: 4, borderBottomWidth: 1, borderColor: colors.line }, questionRow: { minHeight: 54, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 }, question: { flex: 1, color: colors.espresso, fontSize: 14, fontWeight: '800' }, toggle: { color: colors.orange, fontSize: 24, fontWeight: '700' }, answer: { color: colors.muted, fontSize: 13, lineHeight: 21, paddingBottom: 15, paddingRight: 20 } });