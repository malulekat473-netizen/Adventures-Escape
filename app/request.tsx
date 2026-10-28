import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Button, Field, Page, SectionLabel } from '../components/AppUI';
import { useBooking } from '../src/booking';
import { COURSES } from '../src/courses';
import { colors, money } from '../src/theme';

export default function RequestScreen() {
  const { selected, toggleCourse, customer, setCustomer } = useBooking();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState('');
  const update = (key: keyof typeof customer, value: string) => setCustomer({ ...customer, [key]: value });
  const validate = () => {
    const next: Record<string, string> = {};
    if (!customer.name.trim()) next.name = 'Enter your name.';
    if (!/^\S+@\S+\.\S+$/.test(customer.email.trim())) next.email = 'Enter a valid email address.';
    if (!/^\+?[0-9\s()-]{9,16}$/.test(customer.phone.trim())) next.phone = 'Enter a valid contact number.';
    if (customer.date && !/^\d{4}-\d{2}-\d{2}$/.test(customer.date.trim())) next.date = 'Use YYYY-MM-DD.';
    if (!/^\d+$/.test(customer.guests) || Number(customer.guests) < 1) next.guests = 'Enter at least 1 guest.';
    if (selected.length === 0) setSubmitError('Choose at least one course before continuing.'); else setSubmitError('');
    setErrors(next);
    if (Object.keys(next).length || selected.length === 0) return;
    router.push('/quote');
  };

  return <Page title="Tell us about your day." eyebrow="BOOKING / CONTACT REQUEST">
    <Text style={styles.intro}>Share a few details and we’ll get back to you with availability. This request is not a confirmed booking.</Text>
    <SectionLabel>YOUR COURSES</SectionLabel>
    {COURSES.map((course) => {
      const chosen = selected.includes(course.slug);
      return <Pressable
        key={course.slug}
        onPress={() => toggleCourse(course.slug)}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: chosen }}
        accessibilityLabel={`${course.title}, ${money(course.fee)} per person`}
        style={[styles.courseOption, chosen && styles.courseChosen]}
      >
        <View style={[styles.check, chosen && styles.checkChosen]}><Text style={[styles.checkMark, chosen && styles.checkMarkChosen]}>{chosen ? '✓' : ''}</Text></View>
        <View style={styles.courseDetails}>
          <Text style={styles.courseTitle}>{course.title}</Text>
          <Text style={styles.coursePrice}>{money(course.fee)} <Text style={styles.perPerson}>/ person</Text></Text>
        </View>
        <Text style={styles.courseTag}>{course.tag}</Text>
      </Pressable>;
    })}
    {submitError ? <Text style={styles.error}>{submitError}</Text> : null}
    <SectionLabel>YOUR CONTACT DETAILS</SectionLabel>
    <Field label="Full name *" value={customer.name} onChangeText={(value) => update('name', value)} placeholder="Your name" error={errors.name} autoCapitalize="words" />
    <Field label="Email address *" value={customer.email} onChangeText={(value) => update('email', value)} placeholder="you@example.com" keyboardType="email-address" autoCapitalize="none" error={errors.email} />
    <Field label="Phone number *" value={customer.phone} onChangeText={(value) => update('phone', value)} placeholder="e.g. 068 098 2119" keyboardType="phone-pad" error={errors.phone} />
    <View style={styles.split}>
      <View style={styles.half}><Field label="Preferred date" value={customer.date} onChangeText={(value) => update('date', value)} placeholder="YYYY-MM-DD" error={errors.date} /></View>
      <View style={styles.half}><Field label="Guests *" value={customer.guests} onChangeText={(value) => update('guests', value)} placeholder="1" keyboardType="numeric" error={errors.guests} /></View>
    </View>
    <Field label="Anything else?" value={customer.message} onChangeText={(value) => update('message', value)} placeholder="Accessibility needs, questions or details" multiline />
    <Button label="REVIEW NON-FORMAL QUOTE" onPress={validate} />
    <Text style={styles.fine}>* Required. Your details are used to respond to this request.</Text>
  </Page>;
}

const styles = StyleSheet.create({
  intro: { color: colors.muted, fontSize: 14, lineHeight: 22 },
  courseOption: { minHeight: 68, flexDirection: 'row', alignItems: 'center', gap: 11, padding: 12, marginBottom: 8, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.line, borderRadius: 6 },
  courseChosen: { borderColor: colors.orange, backgroundColor: '#FCE6DC' },
  check: { width: 22, height: 22, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.line, borderRadius: 4, backgroundColor: colors.white },
  checkChosen: { borderColor: colors.orange, backgroundColor: colors.orange },
  checkMark: { color: colors.white, fontSize: 14, fontWeight: '900' },
  checkMarkChosen: { color: colors.white },
  courseDetails: { flex: 1 },
  courseTitle: { color: colors.espresso, fontWeight: '800', fontSize: 13 },
  coursePrice: { color: colors.orange, fontWeight: '900', fontSize: 12, marginTop: 4 },
  perPerson: { color: colors.muted, fontWeight: '500', fontSize: 11 },
  courseTag: { color: colors.muted, fontSize: 9, fontWeight: '900', letterSpacing: 0.5 },
  error: { color: colors.danger, fontSize: 13, fontWeight: '700', marginTop: 8 },
  split: { flexDirection: 'row', gap: 12 },
  half: { flex: 1 },
  fine: { color: colors.muted, fontSize: 11, marginTop: 12 },
});