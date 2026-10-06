export type FieldType = 'text' | 'textarea' | 'url' | 'image' | 'number' | 'boolean' | 'list'

export type FieldDef = {
  key: string
  label: string
  type: FieldType
  placeholder?: string
  itemFields?: FieldDef[]
}

export type SectionDefinition = {
  type: string
  label: string
  fields: FieldDef[]
}

const image = (key: string, label: string): FieldDef => ({ key, label, type: 'image' })
const text = (key: string, label: string, placeholder?: string): FieldDef => ({ key, label, type: 'text', placeholder })
const textarea = (key: string, label: string): FieldDef => ({ key, label, type: 'textarea' })
const url = (key: string, label: string): FieldDef => ({ key, label, type: 'url' })
const list = (key: string, label: string, itemFields: FieldDef[]): FieldDef => ({ key, label, type: 'list', itemFields })

export const sectionDefinitions: SectionDefinition[] = [
  { type: 'banner', label: 'Banner', fields: [image('desktop_image','Desktop banner'), image('mobile_image','Mobile banner'), text('eyebrow','Eyebrow'), text('headline','Headline'), text('cta_label','CTA label'), url('cta_url','CTA URL'), text('overlay','Overlay opacity (0-100)','30')] },
  { type: 'company_header', label: 'Logo & Company Header', fields: [image('logo','Company logo'), text('company_name','Company name'), text('tagline','Tagline'), text('founded','Founded'), text('headquarters','Headquarters'), text('employee_count','Employee count'), url('website','Website')] },
  { type: 'about', label: 'About MJIPL', fields: [text('statement','Large statement'), image('image','Section image'), textarea('body','About content'), list('stats','Statistics',[text('value','Value'),text('label','Label')])] },
  { type: 'leaders', label: 'Our Leaders', fields: [textarea('intro','Section introduction'), list('items','Leaders',[image('image','Photo'),text('name','Name'),text('designation','Designation'),textarea('bio','Biography'),url('linkedin','LinkedIn URL')])] },
  { type: 'benefits', label: 'Perks & Benefits', fields: [textarea('intro','Section introduction'), list('items','Benefits',[text('icon','Icon / emoji'),text('title','Title'),textarea('description','Description')])] },
  { type: 'chro', label: 'Message from CHRO', fields: [image('image','CHRO image'), text('name','Name'), text('designation','Designation'), textarea('message','Message'), text('cta_label','CTA label'), url('cta_url','CTA URL')] },
  { type: 'dei', label: 'Inclusion, Equity & Diversity', fields: [image('image','Image'), text('headline','Headline'), textarea('body','Content'), text('cta_label','CTA label'), url('cta_url','CTA URL')] },
  { type: 'sustainability', label: 'Sustainability', fields: [image('image','Image'), text('headline','Headline'), textarea('body','Content'), list('stats','Sustainability metrics',[text('value','Value'),text('label','Label')]), text('cta_label','CTA label'), url('cta_url','CTA URL')] },
  { type: 'csr', label: 'Corporate Social Responsibility', fields: [textarea('intro','Section introduction'), list('items','CSR initiatives',[image('image','Image'),text('title','Title'),textarea('description','Description'),url('url','Read more URL')])] },
  { type: 'awards', label: 'Awards & Recognitions', fields: [list('items','Awards',[image('image','Award image'),text('year','Year'),text('title','Award title'),textarea('description','Description'),text('organisation','Awarding organisation')])] },
  { type: 'achievements', label: 'MJIPL Achievements', fields: [list('items','Achievements',[image('image','Badge image'),text('value','Value'),text('title','Title'),textarea('description','Description')])] },
  { type: 'life', label: 'Life at MJIPL', fields: [textarea('intro','Section introduction'), list('items','Stories',[image('image','Thumbnail'),text('title','Title'),textarea('description','Description'),url('url','Video / article URL')])] },
  { type: 'reviews', label: 'MJIPL Reviews', fields: [text('rating','Overall rating'),text('review_count','Review count'),list('items','Featured reviews',[text('rating','Rating'),text('name','Reviewer'),text('designation','Designation'),text('location','Location'),textarea('likes','Likes'),textarea('dislikes','Dislikes')])] },
  { type: 'creche', label: 'Creche Facility', fields: [image('image','Image'),textarea('body','Content'),text('cta_label','CTA label'),url('cta_url','CTA URL')] },
  { type: 'communities', label: 'Transforming Communities across India', fields: [image('image','Map / image'),textarea('body','Content'),list('items','Locations / projects',[text('state','State'),text('project','Project'),textarea('description','Description')])] },
  { type: 'jobs', label: 'Job Openings', fields: [textarea('intro','Section introduction'),list('items','Job openings',[text('title','Job title'),text('department','Department'),text('location','Location'),text('experience','Experience'),text('employment_type','Employment type'),textarea('description','Description'),url('apply_url','Apply URL')])] },
  { type: 'locations', label: 'Office Locations', fields: [list('items','Office locations',[text('office_name','Office name'),text('city','City'),text('state','State'),text('country','Country'),textarea('address','Address'),text('phone','Phone'),text('email','Email'),url('map_url','Map URL')])] },
  { type: 'connect', label: 'Connect with us', fields: [url('website','Website'),text('email','Email'),text('phone','Phone'),list('socials','Social links',[text('label','Platform'),url('url','URL')])] },
  { type: 'faqs', label: 'MJIPL FAQs', fields: [list('items','FAQs',[text('question','Question'),textarea('answer','Answer')])] },
]

export const sectionDefinitionMap = Object.fromEntries(sectionDefinitions.map(x => [x.type, x])) as Record<string, SectionDefinition>
