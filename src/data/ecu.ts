import logo from '../assets/ecu-efactory-logo.png';
import riding from '../assets/ecu-yanagida-riding.png';
import grom from '../assets/ecu-grom.jpg';
import gsxr from '../assets/ecu-gsxr750.jpg';
import zx4r from '../assets/ecu-zx4r.jpg';
export const ecuImages = { logo, riding };
export const ecuCases = [
  { name: 'HONDA GROM', tag: 'MOTOGYMKHANA / TRANSIENT RESPONSE', title: 'Revisiting setup for transient response', image: grom, alt: 'GROM JC61 motorcycle shown in the published setup record', slug: 'grom-jc61', purpose: 'The original individual enquiry has not been verified. The public record focuses on transient response for motogymkhana.', adjustment: 'Re-setting fuel and ignition, with air–fuel ratio (A/F) remeasurement following a piston replacement.', result: 'Re-setting and A/F remeasurement are documented. Quantified performance changes have not been verified.' },
  { name: 'SUZUKI GSX-R750', tag: 'RIDING / DATA LOGGING', title: 'Checking riding data and low-speed behaviour', image: gsxr, alt: 'Measurement sensor fitted to the GSX-R750 exhaust pipe', slug: 'gsx-r750', purpose: 'The original individual enquiry has not been verified. The record considers low-speed pulling behaviour, engine braking and how to ride the motorcycle.', adjustment: 'Low-speed pulling behaviour and engine braking. Specific control parameters and values have not been verified.', result: 'Logging and adjustments were used while considering the riding approach. The amount of improvement and final assessment have not been verified.' },
  { name: 'KAWASAKI ZX-4R', tag: 'MOTOGYMKHANA / RIDING CHECKS', title: 'Adjusting initial throttle response and deceleration', image: zx4r, alt: 'A laptop connected to a ZX-4R for ECU setup', slug: 'zx-4r', purpose: 'The original individual enquiry has not been verified. The record emphasises smooth initial throttle response and the feeling of power as the throttle opens.', adjustment: 'Idle adjustment through the ECU and engine-braking adjustment.', result: 'Idle and engine-braking adjustments and riding checks are documented. A measured power increase has not been verified.' },
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
 ['Can I send only the ECU?', 'The official X account has announced ECU sales for a specific GROM JC61 setup. Selling an ECU and flashing your own ECU by post are separate services. Postal flashing availability has not been verified: contact eFactory before sending anything.'],
];
