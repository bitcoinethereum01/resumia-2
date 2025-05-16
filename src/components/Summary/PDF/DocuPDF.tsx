import { Document, Page, View, Text, StyleSheet, PDFViewer} from '@react-pdf/renderer'
import './fonts'
import { Summary } from 'components/types/summary.types'
import { useTranslation } from 'next-i18next'

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  title: {
    fontFamily: 'SemiBold',
    fontSize: '20px',
    marginBottom: '15px'
  },
  subtitle: {
    fontFamily: 'Medium',
    fontWeight: 'bold',
    fontSize: '16px',
    marginBottom: '10px'
  },
  intro: {
    marginBottom: '20px', 
    width:'100%'
  },
  text: {
    fontSize: '12px',
    fontFamily: 'Light',
    textAlign: 'justify'
  },
  logo: {
    fontFamily: 'Bold',
    color: '#f87171',
    fontSize: '16px',
    width: '100px'
  },
  line: {
    width: '75px',
    height: '3px',
    backgroundColor: '#f87171'
  }
})

interface DocuPDFProps {
  data: Summary
}

const DocuPDF = ({data}: DocuPDFProps) => {
  const { t } = useTranslation('summary')
  return (
    <PDFViewer className='h-screen w-full'>
      <Document>
        <Page size="A4" style={{padding: '25px', display: 'flex', flexDirection: 'column', gap: '15px'}}>
          <View style={{}}>
            <Text style={styles.logo}>ResumIA
            </Text>
            <View style={styles.line} ></View>
          </View>
          <View 
          style={styles.container}>
            
            <Text style={styles.title}>{data.title}</Text>

            <Text style={[styles.text, styles.intro]}>{data.introduction}</Text>

            <View style={{
            marginBottom: '20px', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center',
            gap: '20px'
            }}>
              {
                data.subtopics?.map((sub, i) => (
                  <View key={i}>
                    <Text style={styles.subtitle}>{sub.subtopicTitle}</Text>
                    <Text style={styles.text}>{sub.subtopicDetail}</Text>
                  </View>
                ))
              }
            </View>
            <View>
              <Text style={styles.subtitle}>{t('conclusionSubtitle')}</Text>
              <Text style={styles.text}>{data.conclusion}</Text>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  )
}

export default DocuPDF;
