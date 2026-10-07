import { Button, Body, Page, Photo, SectionLabel } from '../components/AppUI';
import { courses } from '../src/courses';

export default function AboutScreen() {
  return <Page title="Outside brings us together." eyebrow="A LITTLE ABOUT US">
    <Photo uri="https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=1200&q=85" height={260} />
    <Body>SME Adventures is built around a simple idea: shared experiences make the best memories. We bring people into the outdoors for guided days that are active, welcoming and grounded in safety.</Body>
    <SectionLabel>WHAT MATTERS TO US</SectionLabel>
    <Body>Good guides. Thoughtful preparation. Room for every kind of adventurer. Whether you come as a family, a team or a group of friends, we help make getting outside feel easy.</Body>
    <Button label="FIND YOUR ADVENTURE" href="/courses" />
  </Page>;
}