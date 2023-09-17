const nodemailer = require("nodemailer")
const admitCardData = require("./admitCardData.json")

const transporter = nodemailer.createTransport({
	host: 'smtp-relay.sendinblue.com',
	port: 587,
	auth: {
		user: 'rcaonline.india@gmail.com',
		pass: 'LrMpUkdXNqx0YK35',
	},
})


const sendMail = (email) => {
	if (!email) return
	const linkHref = `https://rcaback.exatorial.com/admit-card/${email}`

	transporter.sendMail({
		from: `Shibli Residential Coaching Academy <admissionsatshiblirca@gmail.com>`,
		to: email,
		subject: `Admit Card for RCA Entrance Exam`,
		text: `Your admit card for the Shibli Residential Coaching Academy has been released. Please log in on the portal https://shiblirca.in with your registered email and download the admit card. Or else, you can directly use this link to print your admit card for the exam ${linkHref} Kindly reach out to us on our official admissions email admissionsatshiblirca@gmail.com in case of any further queries. We wish you best wishes for your exams Office of Controller of Exam, Shibli Residential Coaching Academy`,
		html: `<div><p>Dear Candidate,</p><br />
  <p>Your admit card for the Shibli Residential Coaching Academy has been released. Please log in on the portal https://shiblirca.in with your registered email and download the admit card.</p>
  <p>Or else, you can directly use this link to print your admit card for the exam <a href="${linkHref}">${linkHref}</a></p><br />
  <p>Kindly reach out to us on our official admissions email admissionsatshiblirca@gmail.com in case of any further queries.</p>
  <p>We wish you best wishes for your exams</p>
  <br />
  <p>Office of Controller of Exam,</p>
  <p>Shibli Residential Coaching Academy</p>
</div>`,
	})
}

const wait5s = () => new Promise((resolve) => setTimeout(resolve, 5000))

const sendMailToAll = async () => {
	for (let i = 0; i < admitCardData.length; i++) {
		sendMail(admitCardData[i].email)
		console.log(`${163 + i}: Mail sent to ${admitCardData[i].email}`)
		await wait5s();
	}
}

sendMailToAll()
