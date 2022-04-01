import { Box } from '@chakra-ui/react';
import { LeistungAccordion } from '../components/leistung-accordion';
import { PageHeading } from "../components/page-heading";

const description = 'In unserer Praxis für Physiotherapie und Krankengymnastik bieten wir Ihnen eine Vielzahl an unterschiedlichen Leistungen an.'

const leistungen = [
    {
        title: 'KRANKENGYMNASTIK (KG)',
        description: 'Die allgemeine Krankengymnastik umfasst eine Vielzahl von Behandlungsmethoden und Techniken, die auf das gesamte Bewegungssystem des Körpers einwirken.'
    },
    {
        title: 'MANUELLE LYMPHDRAINAGE (MLD)',
        description: 'Bei der Lymphdrainage sollen die Lymphgefäße stimuliert und zu einem verstärktem Abtransport der Lymphflüssigkeit angeregt werden.'
    },
    {
        title: 'MANUELLE THERAPIE (MT)',
        description: 'Die Manuelle Therapie ist ein Behandlungsansatz, bei dem Funktionsstörungen des Bewegungsapparates untersucht und behandelt werden. Grundlage der Manuellen Therapie sind spezielle Handgriff- und Mobilisationstechniken, bei denen Schmerzen gelindert und Bewegungsstörungen beseitigt werden.'
    },
    {
        title: 'KRANKENGYMNASTIK AUF NEUROPHYSIOLOGISCHER GRUNDLAGE (KG - ZNS)',
    },
    {
        title: 'Massage',
        description: 'Bei der Massage handelt es sich um eine manuelle Behandlungstechnik, die ihre Wirkung über mechanische Reize auf die von ihr erreichbaren Gewebsschichten, im Wesentlichen Haut, Unterhaut und Muskulatur, ausübt.'
    },
    {
        title: 'TANZBERGER KONZEPT (BECKENBODEN THERAPIE)',
        description: 'Das Tanzberger-Konzept® richtet sich an Frauen, Männer und Kinder zur Prävention und Therapie von Funktionsstörungen des Beckenboden- und Kontinenzsystems. Es orientiert sich an den systemspezifischen muskulären und organischen Arbeitsabläufen des gesunden Kontinenzsytems von Blase und Darm.'
    },
    {
        title: 'KIEFERGELENKS-BEHANDLUNG',
    },
    {
        title: 'FUSSREFLEXZONEN - THERAPIE',
    },
    {
        title: 'KÄLTE-/WÄRMETHERAPIE',
        description: 'Behandlung mit lokaler Applikation intensiver Kälte in Form von Eislollys oder Kühlpackungen. Behandlung mit gestrahlter oder geleiteter Wärme durch unmittelbare Erwärmung, meist durch Fango oder Infrarotstrahler.'
    },
    {
        title: 'ELEKTROTHERAPIE',
        description: 'Als Elektrotherapie bezeichnet man die medizinische Anwendung des elektrischen Stroms. Ausgehend von der Erkrankung behandelt der Arzt beziehungsweise der Physiotherapeut einen oder mehrere Körperteile mit unterschiedlichen Stromformen.'
    },
    {
        title: 'KINESIO-/SPORTTAPING',
        description: 'Ein Kinesio-Tape (Physio-Tape, Muskel-Tape) ist eine Art hochelastisches Pflaster aus Stoff. Es dient bei Verletzungen oder Entzündungen von Muskeln, Bändern oder Gelenken als Stabilisierung, ohne die Beweglichkeit einzuschränken.'
    },
    {
        title: 'HAUSBESUCHE',
    }
]

const Leistungen = () => {
    return (
        <Box>
            <PageHeading title="Unsere" underlinedTitle='Leistungen' description={description} />
            <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }} >
                <LeistungAccordion {...leistungen} />
            </Box>
        </Box>
    )
};

export default Leistungen;