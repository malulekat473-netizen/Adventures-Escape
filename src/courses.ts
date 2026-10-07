import type { ImageSourcePropType } from 'react-native';

export type Course = {
  slug: string;
  title: string;
  fee: number;
  purpose: string;
  includes: string[];
  image: ImageSourcePropType;
  tag: string;
};

export const courses: Course[] = [
  {
    slug: 'ultimate-adventure-day', title: 'Ultimate Adventure Day', fee: 1500,
    purpose: 'A full-throttle day outdoors, balancing high-energy challenges with time to reconnect.',
    includes: ['Guided outdoor adventure circuit', 'Team challenge activities', 'Lunch break in the forest', 'All standard safety equipment'],
    image: require('../assets/images/ultimate adventure image.jfif'), tag: 'FULL DAY',
  },
  {
    slug: 'family-explorer-package', title: 'Family Explorer Package', fee: 1500,
    purpose: 'A joyful day of shared discoveries, fresh air and age-friendly outdoor activities.',
    includes: ['Family-friendly guided activities', 'Nature exploration', 'Picnic break', 'Safety briefing and equipment'],
    image: require('../assets/images/family explorer image.jpg'), tag: 'ALL AGES',
  },
  {
    slug: 'mountain-adventure-package', title: 'Mountain Adventure Package', fee: 1500,
    purpose: 'Get out into the mountains for a guided adventure across dramatic high-country terrain.',
    includes: ['Guided mountain route', 'Outdoor skills session', 'Safety equipment', 'Experienced adventure guide'],
    image: require('../assets/images/Mountain Adventure Package.jpg'), tag: 'MOUNTAIN',
  },
  {
    slug: 'corporate-team-challenge', title: 'Corporate Team Challenge', fee: 1500,
    purpose: 'Team-building activities designed for businesses and organisations.',
    includes: ['Team obstacle course', 'Orienteering challenge', 'Raft-building activity', 'Leadership exercises', 'Team awards'],
    image: require('../assets/images/Corporate Team Challenge.jpg'), tag: 'TEAMS',
  },
  {
    slug: 'ziplining-adventure', title: 'Ziplining Adventure', fee: 750,
    purpose: 'Experience breathtaking views while ziplining through the forest.',
    includes: ['Safety briefing', 'Equipment hires', 'Professional instructors'],
    image: require('../assets/images/Ziplining Adventure.jpg'), tag: 'FOREST',
  },
  {
    slug: 'kayaking-experience', title: 'Kayaking Experience', fee: 750,
    purpose: 'Paddle through scenic rivers and lakes.',
    includes: ['Kayak and paddle', 'Safety equipment', 'Guided route'],
    image: require('../assets/images/Kayaking Experience.jpg'), tag: 'ON THE WATER',
  },
  {
    slug: 'rock-climbing-session', title: 'Rock Climbing Session', fee: 750,
    purpose: 'Learn climbing techniques on natural rock faces.',
    includes: ['Climbing equipment', 'Safety instruction', 'Professional guide'],
    image: require('../assets/images/Rock Climbing Session.jpg'), tag: 'CLIMB',
  },
];

export const galleryImages = courses.map((course) => ({ image: course.image, title: course.title }));