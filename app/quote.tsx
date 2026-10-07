import { Link } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Button, Page, SectionLabel } from '../components/AppUI';
import { useBooking } from '../src/booking';
import { courses } from '../src/courses';
import { colors, money } from '../src/theme';

export default function QuoteScreen() {
  const { selected, subtotal, discount, setDiscount, discountAmount, vat, total, customer } = useBooking();
  const [confirmed, setConfirmed] = useState(false);
  const [discountError, setDiscountError] = useState('');
  const setRate = (value: string) => {
    setDiscount(value);
    if (value === '' || (/^\d+(\.\d{0,2})?$/.test(value) && Number(value) <= 100)) setDiscountError('');
    else setDiscountError('Enter a discount from 0 to 100%.');
  };
  const chosen = courses.filter((course) => selected.includes(course.slug));
  return <Page title="Your quote, at a glance." eyebrow="NON-FORMAL QUOTE REVIEW">
    <View style={styles.notice}><Text style={styles.noticeTitle}>NON-FORMAL QUOTE</Text><Text style={styles.noticeBody}>For planning purposes only. This is not a tax invoice, offer, or confirmed booking. Fees and availability must be confirmed by SME Adventures.</Text></View>
    {customer.name ? <Text style={styles.customer}>Prepared for {customer.name}{customer.date ? `  ·  ${customer.date}` : ''}</Text> : null}
    <SectionLabel>SELECTED EXPERIENCES</SectionLabel>
    {chosen.length ? chosen.map((course) => <View style={styles.line} key={course.slug}><Text style={styles.lineName}>{course.title}</Text><Text style={styles.linePrice}>{money(course.fee)}</Text></View>) : <Text style={styles.empty}>No courses selected yet. Browse the course line-up to start a quote.</Text>}
    <Link href="/courses" asChild><Pressable><Text style={styles.change}>+ ADD OR CHANGE COURSES</Text></Pressable></Link>
    <SectionLabel>ESTIMATE BREAKDOWN</SectionLabel>
    <View style={styles.line}><Text style={styles.label}>Subtotal</Text><Text style={styles.value}>{money(subtotal)}</Text></View>
    <View style={styles.discountRow}><Text style={styles.label}>Discount (%)</Text><TextInput value={discount} onChangeText={setRate} keyboardType="numeric" maxLength={6} accessibilityLabel="Discount percentage" style={styles.discountInput} /></View>
    {discountError ? <Text style={styles.error}>{discountError}</Text> : null}
    <View style={styles.line}><Text style={styles.label}>Discount amount</Text><Text style={styles.value}>− {money(discountAmount)}</Text></View>
    <View style={styles.line}><Text style={styles.label}>VAT (15%)</Text><Text style={styles.value}>{money(vat)}</Text></View>
    <View style={[styles.line, styles.totalLine]}><Text style={styles.totalLabel}>ESTIMATED TOTAL</Text><Text style={styles.total}>{money(total)}</Text></View>
    <Text style={styles.taxNote}>VAT calculated at 15% after discount. Final amount subject to confirmation.</Text>
    <SectionLabel>WHAT HAPPENS NEXT</SectionLabel>
    <Text style={styles.next}>We’ll review your request and contact you to confirm dates, availability and final pricing. No payment is due through this app.</Text>
    {confirmed ? <Text style={styles.success}>Request marked for follow-up. Our team will contact you using the details provided.</Text> : null}
    <Button label="SEND REQUEST FOR FOLLOW-UP" onPress={() => setConfirmed(true)} />
    <Button label="EDIT REQUEST DETAILS" href="/request" secondary />
  </Page>;
}

const styles = StyleSheet.create({
  notice: { backgroundColor: colors.espresso, borderLeftWidth: 5, borderLeftColor: colors.orange, padding: 16, borderRadius: 3 }, noticeTitle: { color: colors.tan, fontWeight: '900', fontSize: 11, letterSpacing: 1.4 }, noticeBody: { color: colors.paper, fontSize: 12, lineHeight: 18, marginTop: 7 }, customer: { color: colors.espresso, fontWeight: '700', marginTop: 15 },
  line: { flexDirection: 'row', justifyContent: 'space-between', gap: 12, paddingVertical: 12, borderBottomWidth: 1, borderColor: colors.line }, lineName: { flex: 1, color: colors.espresso, fontWeight: '700', fontSize: 13 }, linePrice: { color: colors.espresso, fontWeight: '800', fontSize: 13 }, label: { color: colors.muted, fontSize: 13 }, value: { color: colors.espresso, fontSize: 13, fontWeight: '700' }, empty: { color: colors.muted, fontSize: 13, lineHeight: 20, paddingVertical: 12 }, change: { color: colors.orange, fontSize: 11, fontWeight: '900', marginTop: 12 }, discountRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', minHeight: 48, borderBottomWidth: 1, borderColor: colors.line }, discountInput: { width: 85, height: 38, paddingHorizontal: 10, textAlign: 'right', borderWidth: 1, borderColor: colors.line, borderRadius: 3, backgroundColor: colors.white, color: colors.espresso }, error: { color: colors.danger, fontSize: 12, marginTop: 6 }, totalLine: { borderBottomWidth: 0, marginTop: 6, backgroundColor: colors.tan, paddingHorizontal: 13 }, totalLabel: { color: colors.espresso, fontSize: 11, fontWeight: '900', letterSpacing: 0.7 }, total: { color: colors.espresso, fontWeight: '900', fontSize: 18 }, taxNote: { color: colors.muted, fontSize: 11, marginTop: 9 }, next: { color: colors.muted, fontSize: 13, lineHeight: 21 }, success: { color: '#137547', fontSize: 13, fontWeight: '700', padding: 12, backgroundColor: '#E5F5EC', marginTop: 14 },
});