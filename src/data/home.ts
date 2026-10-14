// Original files downloaded from the current Japanese HOME. See docs/IMAGE-SOURCES.json.
import headerLogo from '../assets/jp-home-00.png';
import workshop from '../assets/jp-home-01.png';
import diy from '../assets/jp-home-02.png';
import setup from '../assets/jp-home-04.png';
import tyres from '../assets/jp-home-06.png';
import gymkhana from '../assets/jp-home-09.png';
import fabrication from '../assets/jp-home-10.png';
import ecu from '../assets/jp-home-11.png';
import cstTyres from '../assets/jp-home-12.png';
import cstLogo from '../assets/jp-home-13.png';
import ssbLogo from '../assets/jp-home-14.png';
import workshopDetail from '../assets/jp-home-19.jpg';
import footerLogo from '../assets/jp-home-20.png';
export const homeImages = { headerLogo, footerLogo, workshop, workshopDetail, cstTyres, cstLogo, ssbLogo };
export const homeServices = [
  {
    title: 'Work on your own bike', image: diy, alt: 'Oil-change illustration used on the Japanese eFactory HOME',
    href: '/services/#diy-support', label: 'DIY & PARTS FITTING',
    text: 'Get practical support for maintenance, parts fitting, wiring and custom projects. Build your understanding of the motorcycle you ride in Japan.',
  },
  {
    title: 'Tools & setup support', image: setup, alt: 'Suspension illustration used on the Japanese eFactory HOME',
    href: '/services/#diy-support', label: 'EQUIPMENT & KNOW-HOW',
    text: 'Use workshop equipment as part of the agreed support for your task. Riding-position and suspension-setting advice are listed as member services.',
  },
  {
    title: 'Tyres & maintenance', image: tyres, alt: 'Tyre-changer illustration used on the Japanese eFactory HOME',
    href: '/services/#installation-tyres', label: 'THE PRACTICAL ESSENTIALS',
    text: 'Ask about tyre changes, oil changes and other maintenance. Staff operate the tyre changer; confirm the preparation and support needed for your bike.',
  },
  {
    title: 'Custom part design', image: fabrication, alt: 'Parts-fabrication illustration used on the Japanese eFactory HOME',
    href: '/services/#custom-parts', label: 'DESIGN & FABRICATION',
    text: 'Discuss part design, fabrication, welding and one-off machining with eFactory. Feasibility, materials and specialist work are assessed and quoted individually.',
  },
  {
    title: 'ECU Flashing & setup', image: ecu, alt: 'ECU illustration used on the Japanese eFactory HOME',
    href: '/ecu-tuning/', label: 'TECHNICAL SERVICES',
    text: 'eFactory assesses ECU Flashing services according to the model, year, ECU and intended use. Confirm compatibility, scope and price before arranging work.',
  },
  {
    title: 'Gymkhana & track goals', image: gymkhana, alt: 'Gymkhana illustration used on the Japanese eFactory HOME',
    href: '/services/#riding-support', label: 'BUILD. RIDE. LEARN.',
    text: 'Preparing for gymkhana or track use? Ask which bike-setup support fits your project. Riding and gymkhana advice are listed as member services; scope needs confirmation.',
  },
];
