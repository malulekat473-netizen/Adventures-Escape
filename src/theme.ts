export const colors = {
  orange: '#FE581A',
  tan: '#D7B791',
  stone: '#D2C6BA',
  black: '#000103',
  espresso: '#311F1B',
  paper: '#F5F1EB',
  white: '#FFFFFF',
  muted: '#76675F',
  line: '#E5DCD2',
  danger: '#B42318',
};

export const contact = {
  phone: '0680982119',
  email: 'ST10526345@rcconnect.edu.za',
  directions: 'https://maps.app.goo.gl/QhLLXGd2u14aw6LY6',
};

export const money = (amount: number) => `R${amount.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;