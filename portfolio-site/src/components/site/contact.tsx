import { useRef, useState, type FormEvent } from 'react';

// Existing public EmailJS configuration from index-page.js. No new service or recipient.
export function ContactForm() {
  const [status,setStatus]=useState('');
  const [pending,setPending]=useState(false);
  const sending=useRef(false);
  async function submit(event:FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form=event.currentTarget;
    if(sending.current || !form.reportValidity()) return;
    const data=new FormData(form);
    if(data.get('bot-field')) return;
    sending.current=true;setPending(true);setStatus('');
    try {
      const response=await fetch('https://api.emailjs.com/api/v1.0/email/send',{
        method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({service_id:'service_t79kzen',template_id:'template_dyq9o4r',user_id:'tsCajoh5dqxR93vz5',template_params:{name:data.get('name'),email:data.get('email'),reply_to:data.get('email'),project_type:data.get('project-type'),timeline:data.get('timeline')||'Not specified',message:data.get('message')}}),
      });
      if(!response.ok) throw new Error('Delivery failed');
      setStatus('Message sent. Thanks for reaching out!');form.reset();
    } catch {
      setStatus('Your message could not be sent. Please email me directly using the address beside this form.');
    } finally {sending.current=false;setPending(false);}
  }
  return <form className="brief" id="contactForm" onSubmit={submit}>
    <h3>Send a project brief</h3><p>Tell me the goal and who it is for.</p>
    <div className="contact-honeypot" aria-hidden="true"><label>Leave this blank<input name="bot-field" tabIndex={-1} autoComplete="off"/></label></div>
    <div className="field"><label htmlFor="bf-name">Your name</label><input id="bf-name" name="name" autoComplete="name" maxLength={120} required/></div>
    <div className="field"><label htmlFor="bf-email">Email address</label><input id="bf-email" name="email" type="email" autoComplete="email" maxLength={254} required/></div>
    <div className="field"><label htmlFor="bf-what">What are we discussing?</label><select id="bf-what" name="project-type" required defaultValue=""><option value="">Choose one</option><option>Business website</option><option>Web application</option><option>Interactive prototype</option><option>Development role</option><option>Something else</option></select></div>
    <div className="field"><label htmlFor="bf-timeline">Ideal timeline</label><select id="bf-timeline" name="timeline" defaultValue=""><option value="">Not sure yet</option><option>Within 2 weeks</option><option>Within 1 month</option><option>Within 2–3 months</option><option>Flexible</option></select></div>
    <div className="field"><label htmlFor="bf-msg">What should it accomplish?</label><textarea id="bf-msg" name="message" rows={4} maxLength={5000} required/></div>
    <button className="brief-btn" type="submit" disabled={pending}>{pending?'Sending…':'Send project brief ↗'}</button>
    <p id="formStatus" role="status" aria-live="polite">{status}</p>
    <p className="hint">Delivered through EmailJS. Or email me directly.</p>
  </form>;
}
