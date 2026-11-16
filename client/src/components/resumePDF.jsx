
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    paddingTop: 48,
    paddingBottom: 48,
    paddingHorizontal: 55,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#334155",
    lineHeight: 1.5,
  },

  header: {
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#1e293b",
    paddingBottom: 18,
    marginBottom: 22,
  },

  name: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#0f172a",
    textTransform: "uppercase",
    textAlign: "center",
    letterSpacing: 1,
  },

  headline: {
    marginTop: 8,
    fontSize: 11,
    fontWeight: "bold",
    color: "#1e3a8a",
    textAlign: "center",
  },

  contact: {
    marginTop: 10,
    fontSize: 9,
    color: "#64748b",
    textAlign: "center",
  },

  section: {
    marginBottom: 17,
  },

  sectionTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#0f172a",
    textTransform: "uppercase",
    letterSpacing: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#cbd5e1",
    paddingBottom: 5,
    marginBottom: 9,
  },

  paragraph: {
    fontSize: 9.5,
    lineHeight: 1.6,
    color: "#334155",
  },

  bulletRow: {
    flexDirection: "row",
    marginBottom: 5,
    paddingLeft: 3,
  },

  bullet: {
    width: 12,
    fontSize: 9.5,
  },

  bulletText: {
    flex: 1,
    fontSize: 9.5,
    lineHeight: 1.5,
  },
});

function ResumePDF({ resume }) {
  if (!resume) return null;

  const contactDetails = [
    resume.email,
    resume.phone,
    resume.location,
  ].filter(Boolean);

  function renderBullets(items) {
    if (!Array.isArray(items) || items.length === 0) return null;

    return items.map((item, index) => (
      <View style={styles.bulletRow} key={index}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}>{item}</Text>
      </View>
    ));
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>
            {resume.fullName || ""}
          </Text>

          {resume.professionalHeadline && (
            <Text style={styles.headline}>
              {resume.professionalHeadline}
            </Text>
          )}

          {contactDetails.length > 0 && (
            <Text style={styles.contact}>
              {contactDetails.join("  |  ")}
            </Text>
          )}
        </View>

        {/* Professional Summary */}
        {resume.professionalSummary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Professional Summary
            </Text>
            <Text style={styles.paragraph}>
              {resume.professionalSummary}
            </Text>
          </View>
        )}

        {/* Work Experience */}
        {resume.experienceBullets?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Work Experience
            </Text>
            {renderBullets(resume.experienceBullets)}
          </View>
        )}

        {/* Projects */}
        {resume.projectBullets?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Projects
            </Text>
            {renderBullets(resume.projectBullets)}
          </View>
        )}

        {/* Skills */}
        {resume.skills?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Technical Skills
            </Text>
            <Text style={styles.paragraph}>
              {resume.skills.join("  •  ")}
            </Text>
          </View>
        )}

        {/* Education */}
        {resume.education && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Education
            </Text>
            <Text style={styles.paragraph}>
              {resume.education}
            </Text>
          </View>
        )}

        {/* Certifications */}
        {resume.certifications?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Certifications
            </Text>
            {renderBullets(resume.certifications)}
          </View>
        )}
      </Page>
    </Document>
  );
}

export default ResumePDF;
