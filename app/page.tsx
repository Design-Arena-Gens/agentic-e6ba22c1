'use client'

import { useState, useRef, useEffect } from 'react'
import { 
  Send, 
  Calendar, 
  Clock, 
  Stethoscope, 
  MessageCircle,
  Phone,
  MapPin,
  Star,
  ChevronRight,
  Sparkles,
  Heart,
  Shield,
  Menu,
  X
} from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface QuickAction {
  icon: React.ReactNode
  label: string
  prompt: string
}

const quickActions: QuickAction[] = [
  { icon: <Calendar className="w-5 h-5" />, label: 'Book Appointment', prompt: 'I would like to book a dental appointment' },
  { icon: <Clock className="w-5 h-5" />, label: 'Office Hours', prompt: 'What are your office hours?' },
  { icon: <Stethoscope className="w-5 h-5" />, label: 'Services', prompt: 'What dental services do you offer?' },
  { icon: <Phone className="w-5 h-5" />, label: 'Emergency', prompt: 'I have a dental emergency!' },
]

const services = [
  { name: 'General Dentistry', icon: <Stethoscope className="w-6 h-6" />, desc: 'Cleanings, fillings, and preventive care' },
  { name: 'Cosmetic Dentistry', icon: <Sparkles className="w-6 h-6" />, desc: 'Whitening, veneers, and smile makeovers' },
  { name: 'Pediatric Care', icon: <Heart className="w-6 h-6" />, desc: 'Gentle dental care for children' },
  { name: 'Emergency Services', icon: <Shield className="w-6 h-6" />, desc: '24/7 emergency dental support' },
]

// Dental AI response generator
function generateDentalResponse(userMessage: string): string {
  const message = userMessage.toLowerCase()
  
  // Appointment booking
  if (message.includes('appointment') || message.includes('book') || message.includes('schedule')) {
    return `I'd be happy to help you schedule an appointment! 📅

**Available Time Slots This Week:**
• Monday: 9:00 AM, 2:00 PM, 4:30 PM
• Tuesday: 10:00 AM, 1:00 PM, 3:00 PM
• Wednesday: 9:30 AM, 11:00 AM, 2:30 PM
• Thursday: 10:00 AM, 2:00 PM, 4:00 PM
• Friday: 9:00 AM, 11:30 AM, 1:00 PM

**To complete your booking, I'll need:**
1. Your preferred date and time
2. Type of visit (checkup, cleaning, specific concern)
3. Your contact information

Which time slot works best for you?`
  }
  
  // Office hours
  if (message.includes('hours') || message.includes('open') || message.includes('when')) {
    return `**Our Office Hours** 🕐

📍 **DentaCare Dental Clinic**

| Day | Hours |
|-----|-------|
| Monday | 8:00 AM - 6:00 PM |
| Tuesday | 8:00 AM - 6:00 PM |
| Wednesday | 8:00 AM - 7:00 PM |
| Thursday | 8:00 AM - 6:00 PM |
| Friday | 8:00 AM - 5:00 PM |
| Saturday | 9:00 AM - 2:00 PM |
| Sunday | Closed |

**Emergency Services:** Available 24/7 - Call our emergency hotline!

Would you like to schedule an appointment during any of these times?`
  }
  
  // Services
  if (message.includes('service') || message.includes('offer') || message.includes('treatment') || message.includes('procedure')) {
    return `**Our Dental Services** 🦷

**Preventive Care:**
• Dental cleanings & exams
• X-rays & diagnostics
• Fluoride treatments
• Sealants

**Restorative Dentistry:**
• Fillings (composite & amalgam)
• Crowns & bridges
• Root canal therapy
• Dental implants

**Cosmetic Dentistry:**
• Teeth whitening
• Porcelain veneers
• Invisalign® aligners
• Smile makeovers

**Specialized Care:**
• Pediatric dentistry
• Periodontal treatment
• Oral surgery
• TMJ therapy

Which service would you like to learn more about?`
  }
  
  // Emergency
  if (message.includes('emergency') || message.includes('pain') || message.includes('hurt') || message.includes('ache') || message.includes('broken') || message.includes('knocked')) {
    return `🚨 **Dental Emergency Response**

I understand you may be experiencing dental distress. Here's immediate guidance:

**For Severe Pain or Trauma:**
📞 **Emergency Hotline: 1-800-DENTAL-911**

**Immediate Self-Care Tips:**

**For Toothache:**
• Rinse with warm salt water
• Take over-the-counter pain relief
• Apply a cold compress to your cheek

**For Knocked-Out Tooth:**
• Handle tooth by crown only (not root)
• Rinse gently, don't scrub
• Try to reinsert or keep in milk
• **Seek care within 30 minutes**

**For Broken/Chipped Tooth:**
• Rinse mouth with warm water
• Save any pieces
• Apply gauze to bleeding areas

**We can see you immediately!**
Reply with your location or call now for the fastest response.

Is this a life-threatening emergency? If so, please call 911.`
  }
  
  // Insurance
  if (message.includes('insurance') || message.includes('payment') || message.includes('cost') || message.includes('price') || message.includes('pay')) {
    return `**Insurance & Payment Information** 💳

**Accepted Insurance Plans:**
• Delta Dental
• Cigna
• Aetna
• MetLife
• Guardian
• United Healthcare
• Most PPO plans

**Payment Options:**
• Cash, Check, Credit/Debit Cards
• CareCredit financing
• In-house payment plans
• HSA/FSA accepted

**No Insurance? No Problem!**
We offer a **Dental Savings Plan** for uninsured patients:
• Annual fee: $299/individual, $499/family
• Includes 2 cleanings, exams, and X-rays
• 20% off all other services

Would you like a cost estimate for a specific procedure?`
  }
  
  // Location
  if (message.includes('location') || message.includes('address') || message.includes('where') || message.includes('direction') || message.includes('find')) {
    return `**Find Us** 📍

**DentaCare Dental Clinic**
123 Smile Avenue, Suite 100
Dental City, DC 12345

**Getting Here:**
• 🚗 Free parking available in building lot
• 🚇 2 blocks from Central Metro Station
• 🚌 Bus routes 10, 25, and 42 stop nearby

**Landmarks:**
• Across from City Park
• Next to the Coffee Bean café

**Contact:**
• 📞 Phone: (555) 123-SMILE
• 📧 Email: hello@dentacare.com
• 💬 Text us: (555) 123-7654

Would you like me to help you book an appointment?`
  }
  
  // Teeth whitening
  if (message.includes('whiten') || message.includes('white') || message.includes('bright') || message.includes('stain')) {
    return `**Teeth Whitening Options** ✨

**In-Office Whitening (ZOOM!):**
• 1-hour treatment
• Up to 8 shades brighter
• Immediate results
• Price: $450

**Take-Home Whitening Kit:**
• Custom-fitted trays
• Professional-strength gel
• 2-week treatment
• Price: $299

**Whitening for Sensitive Teeth:**
• Gentle formula available
• Desensitizing treatment included

**Tips for Maintaining Your White Smile:**
• Brush twice daily
• Avoid staining foods/drinks (coffee, red wine)
• Regular dental cleanings
• Touch-up treatments every 6-12 months

Ready to brighten your smile? I can help you schedule a whitening consultation!`
  }
  
  // Cleaning
  if (message.includes('clean') || message.includes('hygiene') || message.includes('checkup') || message.includes('check-up') || message.includes('exam')) {
    return `**Dental Cleaning & Checkups** 🦷

**What's Included in Your Visit:**

**Standard Cleaning ($95):**
• Remove plaque and tartar
• Polish teeth
• Floss between teeth
• Fluoride treatment
• Oral health assessment

**Deep Cleaning ($250-400/quadrant):**
• For gum disease treatment
• Scaling and root planing
• May require multiple visits

**Comprehensive Exam ($75):**
• Digital X-rays
• Oral cancer screening
• Gum health evaluation
• Treatment recommendations

**We Recommend:**
• Cleanings every 6 months
• X-rays annually
• Comprehensive exam yearly

Most insurance covers 2 cleanings per year at 100%!

Would you like to schedule your next cleaning?`
  }
  
  // Braces/Invisalign
  if (message.includes('brace') || message.includes('invisalign') || message.includes('straight') || message.includes('ortho') || message.includes('align')) {
    return `**Orthodontic Options** 😁

**Invisalign® Clear Aligners:**
• Nearly invisible aligners
• Removable for eating/cleaning
• Average treatment: 12-18 months
• Price: $4,000 - $7,500
• Free consultation available!

**Traditional Braces:**
• Metal or ceramic options
• Effective for complex cases
• Average treatment: 18-24 months
• Price: $3,500 - $6,000

**Benefits of Straight Teeth:**
• Easier to clean
• Better bite alignment
• Improved confidence
• Reduced jaw pain

**Financing Available:**
• 0% interest for 24 months
• Monthly payments as low as $150

Would you like to schedule a free orthodontic consultation?`
  }
  
  // Implants
  if (message.includes('implant') || message.includes('missing tooth') || message.includes('replace')) {
    return `**Dental Implants** 🦷

**What Are Dental Implants?**
Permanent replacement for missing teeth that look and function like natural teeth.

**The Process:**
1. **Consultation & Planning** - 3D imaging and treatment plan
2. **Implant Placement** - Titanium post inserted into jawbone
3. **Healing Period** - 3-6 months for osseointegration
4. **Crown Placement** - Custom crown attached

**Pricing:**
• Single implant: $3,000 - $4,500
• Implant with crown: $4,500 - $6,000
• Full arch (All-on-4): $15,000 - $25,000

**Why Choose Implants?**
✓ 98% success rate
✓ Lasts 25+ years with care
✓ Preserves jawbone
✓ No damage to adjacent teeth

**Financing options available!**

Would you like to schedule an implant consultation?`
  }
  
  // Anxiety/Fear
  if (message.includes('scared') || message.includes('afraid') || message.includes('anxiety') || message.includes('nervous') || message.includes('fear')) {
    return `**Comfortable, Anxiety-Free Dentistry** 💆

We understand dental anxiety is real, and we're here to help!

**Comfort Options We Offer:**

**Sedation Dentistry:**
• Nitrous oxide (laughing gas) - $50
• Oral sedation - $150-300
• IV sedation - $300-500

**Comfort Amenities:**
• Noise-canceling headphones
• Netflix/music during treatment
• Weighted blankets
• Aromatherapy
• Stress balls

**Our Gentle Approach:**
• Extra time for nervous patients
• Explain every step beforehand
• "Stop" signal you control
• Compassionate, patient staff

**Tips for Your Visit:**
• Bring a friend for support
• Practice deep breathing
• Listen to calming music
• Communicate your concerns

You're not alone - 36% of people have dental anxiety. We've helped thousands overcome their fears!

Would you like to speak with our comfort coordinator?`
  }
  
  // Greeting
  if (message.includes('hello') || message.includes('hi') || message.includes('hey') || message.includes('good morning') || message.includes('good afternoon')) {
    return `Hello! 👋 Welcome to DentaCare AI Assistant!

I'm here to help you with all your dental needs. I can assist you with:

• 📅 **Scheduling appointments**
• ⏰ **Office hours & location**
• 🦷 **Information about our services**
• 💳 **Insurance & payment questions**
• 🚨 **Dental emergencies**
• 💡 **Oral health tips**

How can I help you today?`
  }
  
  // Thank you
  if (message.includes('thank') || message.includes('thanks')) {
    return `You're very welcome! 😊

Is there anything else I can help you with today?

Remember:
• Regular checkups keep your smile healthy
• We're here Monday-Saturday
• Emergency services available 24/7

Have a wonderful day, and keep smiling! 🦷✨`
  }
  
  // Default response
  return `Thank you for your message! I'm your DentaCare AI Assistant, here to help with all your dental needs.

I can help you with:
• 📅 **Booking appointments** - Just say "I'd like to book an appointment"
• ⏰ **Office hours** - Ask "What are your hours?"
• 🦷 **Our services** - Ask "What services do you offer?"
• 💳 **Insurance & costs** - Ask about payment options
• 🚨 **Emergencies** - Say "I have an emergency"
• 📍 **Location** - Ask "Where are you located?"

Could you please tell me more about what you're looking for? I'm here to help! 😊`
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `👋 **Welcome to DentaCare AI Assistant!**

I'm your personal dental assistant, available 24/7 to help with:

• 📅 Scheduling appointments
• 🦷 Information about our services
• 💳 Insurance & payment questions
• 🚨 Dental emergencies
• 💡 Oral health guidance

How can I help you today? Feel free to ask anything or use the quick action buttons below!`,
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async (messageText?: string) => {
    const text = messageText || input
    if (!text.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate AI response delay
    setTimeout(() => {
      const response = generateDentalResponse(text)
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleQuickAction = (prompt: string) => {
    handleSend(prompt)
  }

  const formatMessage = (content: string) => {
    // Convert markdown-style formatting to HTML
    let formatted = content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br />')
    return formatted
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="glass-effect sticky top-0 z-50 border-b border-dental-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-dental-400 to-dental-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">🦷</span>
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text">DentaCare</h1>
                <p className="text-xs text-gray-500">AI Assistant</p>
              </div>
            </div>
            
            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-6">
              <a href="#services" className="text-gray-600 hover:text-dental-600 transition-colors">Services</a>
              <a href="#chat" className="text-gray-600 hover:text-dental-600 transition-colors">Chat</a>
              <button className="bg-dental-500 hover:bg-dental-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Book Now
              </button>
            </nav>

            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-dental-200 bg-white">
            <div className="px-4 py-3 space-y-2">
              <a href="#services" className="block py-2 text-gray-600">Services</a>
              <a href="#chat" className="block py-2 text-gray-600">Chat</a>
              <button className="w-full bg-dental-500 text-white px-4 py-2 rounded-lg font-medium">
                Book Now
              </button>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Your <span className="gradient-text">Personal Dental</span> Assistant
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get instant answers, book appointments, and receive personalized dental care guidance – all powered by AI, available 24/7.
            </p>
          </div>

          {/* Services Grid */}
          <div id="services" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {services.map((service, index) => (
              <div 
                key={index}
                className="glass-effect p-6 rounded-2xl hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group"
              >
                <div className="w-12 h-12 bg-dental-100 rounded-xl flex items-center justify-center mb-4 text-dental-600 group-hover:bg-dental-500 group-hover:text-white transition-colors">
                  {service.icon}
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">{service.name}</h3>
                <p className="text-sm text-gray-500">{service.desc}</p>
              </div>
            ))}
          </div>

          {/* Chat Interface */}
          <div id="chat" className="glass-effect rounded-3xl overflow-hidden shadow-2xl max-w-4xl mx-auto">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-dental-500 to-dental-600 text-white p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">DentaCare Assistant</h3>
                  <p className="text-sm text-dental-100 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    Online - Ready to help
                  </p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-[400px] overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} message-enter`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 ${
                      message.role === 'user'
                        ? 'bg-dental-500 text-white rounded-br-md'
                        : 'bg-white shadow-md rounded-bl-md border border-gray-100'
                    }`}
                  >
                    <div 
                      className={`text-sm sm:text-base ${message.role === 'assistant' ? 'text-gray-700' : ''}`}
                      dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
                    />
                    <p className={`text-xs mt-2 ${message.role === 'user' ? 'text-dental-100' : 'text-gray-400'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start message-enter">
                  <div className="bg-white shadow-md rounded-2xl rounded-bl-md p-4 border border-gray-100">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-dental-400 rounded-full typing-dot"></div>
                      <div className="w-2 h-2 bg-dental-400 rounded-full typing-dot"></div>
                      <div className="w-2 h-2 bg-dental-400 rounded-full typing-dot"></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="p-3 bg-gray-50 border-t border-gray-100">
              <div className="flex flex-wrap gap-2">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickAction(action.prompt)}
                    className="flex items-center gap-2 px-3 py-2 bg-white rounded-full text-sm text-gray-600 hover:bg-dental-50 hover:text-dental-600 transition-colors border border-gray-200 hover:border-dental-200"
                  >
                    {action.icon}
                    <span className="hidden sm:inline">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-100">
              <div className="flex gap-3">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about appointments, services, or dental care..."
                  className="flex-1 px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-dental-400 transition-all"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim()}
                  className="px-4 py-3 bg-dental-500 hover:bg-dental-600 disabled:bg-gray-300 text-white rounded-xl transition-colors flex items-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  <span className="hidden sm:inline">Send</span>
                </button>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 text-center">
            <div className="flex flex-wrap justify-center gap-8 text-gray-500">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span>4.9/5 Patient Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-dental-500" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-dental-500" />
                <span>24/7 AI Support</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🦷</span>
                <span className="text-xl font-bold text-white">DentaCare</span>
              </div>
              <p className="text-sm">Your trusted partner in dental health, powered by advanced AI technology for better patient care.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Contact</h4>
              <div className="space-y-2 text-sm">
                <p className="flex items-center gap-2"><Phone className="w-4 h-4" /> (555) 123-SMILE</p>
                <p className="flex items-center gap-2"><MapPin className="w-4 h-4" /> 123 Smile Avenue, Suite 100</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Hours</h4>
              <div className="text-sm space-y-1">
                <p>Mon-Fri: 8AM - 6PM</p>
                <p>Saturday: 9AM - 2PM</p>
                <p>Emergency: 24/7</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 text-center text-sm">
            <p>© 2024 DentaCare AI Assistant. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
