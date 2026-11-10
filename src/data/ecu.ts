import logo from '../assets/ecu-efactory-logo.png';
import riding from '../assets/ecu-yanagida-riding.png';
import grom from '../assets/ecu-grom.jpg';
import gsxr from '../assets/ecu-gsxr750.jpg';
import zx4r from '../assets/ecu-zx4r.jpg';
export const ecuImages = { logo, riding };
export const ecuCases = [
  { name: 'HONDA GROM', tag: 'MOTOGYMKHANA / TRANSIENT RESPONSE', title: "ECU tuning focused on transient response", image: grom, alt: 'GROM JC61 motorcycle shown in the published setup record', slug: 'grom-jc61', summary: ["This re-tuning project focused on the engine’s response to throttle inputs, a key factor in motogymkhana. Alongside making power from the 125cc engine, torque was also increased at partial throttle—an improvement that peak horsepower figures do not capture—resulting in smooth, consistent and manageable delivery throughout the operating range."] },
  { name: 'SUZUKI GSX-R750', tag: 'RIDING / DATA LOGGING', title: "Refining engine behaviour using riding data", image: gsxr, alt: 'Measurement sensor fitted to the GSX-R750 exhaust pipe', slug: 'gsx-r750', summary: ["Data was logged during riding to adjust low-speed tractability and engine-braking characteristics.","This project considered riding technique as well as the setup, while checking the rider’s inputs and the motorcycle’s response.","We make fine adjustments on site, discussing the changes together with the rider."] },
  { name: 'KAWASAKI ZX-4R', tag: 'MOTOGYMKHANA / RIDING CHECKS', title: "Refining initial throttle response and deceleration", image: zx4r, alt: 'A laptop connected to a ZX-4R for ECU setup', slug: 'zx-4r', summary: ["This setup focused on smooth initial throttle response and the feeling of power as the throttle opens. The motorcycle’s electronic throttle allows idle control through the ECU, and the tuning made the engine hold its revs longer when the throttle is closed than it did previously. Engine braking was also adjusted, making low-speed turns easier."] },
];
export const ecuSteps = [
 ['Make an enquiry', 'Tell us your motorcycle model, symptoms and the response you would like, using the official ECU LINE account.'],
 ['Check the motorcycle & specification', 'Review the year, ECU, modified parts and vehicle condition.'],
 ['Confirm compatibility & a quote', 'Agree on the scope, cost, schedule and verification methods before proceeding.'],
 ['Flash & verify', 'Carry out the agreed flashing and the necessary checks.'],
 ['Explain the findings', 'Share what was confirmed and any points that need further adjustment.'],
];
export const ecuFaq = [
 ['Which motorcycles are supported?', 'Compatibility and adjustable parameters depend on the model, year, ECU and vehicle specification. The examples do not establish support for every model or year. Send your model, year and modified parts first.'],
 ['Can I enquire after changing the exhaust?', 'Yes, you can enquire about your current specification. Include the exhaust manufacturer and product, plus intake or engine changes. Flashing compatibility and measurement methods are checked individually.'],
 ['Can the setup be adjusted again afterwards?', 'A GROM re-setting example is publicly documented. Confirm availability for your own motorcycle, costs, number of adjustments and the applicable time window before work begins.'],
 ['Can I send only the ECU?', 'The official X account has announced ECU sales for a specific GROM JC61 setup. Selling an ECU and flashing your own ECU by post are separate services. Contact eFactory to confirm postal flashing availability before sending anything.'],
];

