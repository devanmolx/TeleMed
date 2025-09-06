'use client';

import { useState, useEffect } from 'react';
import { 
  Globe, 
  Wifi, 
  WifiOff, 
  Home,
  Video,
  Pill,
  FileText,
  Stethoscope,
  Users,
  ChevronLeft,
  Phone,
  MessageCircle,
  Calendar,
  Search,
  Map,
  List,
  QrCode,
  RefreshCw,
  Mic,
  Play,
  Check,
  X,
  User,
  Plus,
  Heart,
  Activity,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

type Language = 'english' | 'hindi' | 'punjabi';
type Screen = 'language' | 'home' | 'doctor' | 'medicine' | 'records' | 'symptoms' | 'community';

const translations = {
  english: {
    selectLanguage: 'Select Your Language',
    continue: 'Continue',
    consultDoctor: 'Consult a Doctor',
    checkMedicines: 'Check Medicines',
    healthRecords: 'My Health Records',
    symptomChecker: 'Symptom Checker',
    offlineMode: 'Offline Mode',
    online: 'Online',
    offline: 'Offline',
    welcome: 'Welcome to TeleMed',
    yourHealth: 'Your health, our priority',
    doctorConsultation: 'Doctor Consultation',
    medicineAvailability: 'Medicine Availability',
    myHealthRecords: 'My Health Records',
    aiSymptomChecker: 'AI Symptom Checker',
    communityMode: 'Community Access',
    bookAppointment: 'Book Appointment',
    startVideoCall: 'Start Video Call',
    voiceCall: 'Voice Call',
    chatWithDoctor: 'Chat with Doctor',
    searchMedicine: 'Search for medicine...',
    nearbyPharmacies: 'Nearby Pharmacies',
    available: 'Available',
    outOfStock: 'Out of Stock',
    patientCard: 'Digital Patient Card',
    syncData: 'Sync Data',
    pastConsultations: 'Past Consultations',
    describeSymptoms: 'Describe your symptoms',
    speakSymptoms: 'Tap to speak',
    homeCare: 'Home Care',
    pharmacyVisit: 'Visit Pharmacy',
    doctorConsult: 'Consult Doctor',
    kioskMode: 'ASHA Worker Mode',
    addPatient: 'Add New Patient',
    switchProfile: 'Switch Profile'
  },
  hindi: {
    selectLanguage: 'अपनी भाषा चुनें',
    continue: 'जारी रखें',
    consultDoctor: 'डॉक्टर से सलाह लें',
    checkMedicines: 'दवाइयाँ देखें',
    healthRecords: 'मेरे स्वास्थ्य रिकॉर्ड',
    symptomChecker: 'लक्षण जाँचकर्ता',
    offlineMode: 'ऑफलाइन मोड',
    online: 'ऑनलाइन',
    offline: 'ऑफलाइन',
    welcome: 'टेलीमेड में आपका स्वागत है',
    yourHealth: 'आपका स्वास्थ्य, हमारी प्राथमिकता',
    doctorConsultation: 'डॉक्टर परामर्श',
    medicineAvailability: 'दवा की उपलब्धता',
    myHealthRecords: 'मेरे स्वास्थ्य रिकॉर्ड',
    aiSymptomChecker: 'एआई लक्षण जाँचकर्ता',
    communityMode: 'सामुदायिक पहुँच',
    bookAppointment: 'अपॉइंटमेंट बुक करें',
    startVideoCall: 'वीडियो कॉल शुरू करें',
    voiceCall: 'वॉयस कॉल',
    chatWithDoctor: 'डॉक्टर से चैट करें',
    searchMedicine: 'दवा खोजें...',
    nearbyPharmacies: 'नजदीकी फार्मेसी',
    available: 'उपलब्ध',
    outOfStock: 'स्टॉक में नहीं',
    patientCard: 'डिजिटल मरीज़ कार्ड',
    syncData: 'डेटा सिंक करें',
    pastConsultations: 'पिछली सलाह',
    describeSymptoms: 'अपने लक्षण बताएं',
    speakSymptoms: 'बोलने के लिए टैप करें',
    homeCare: 'घरेलू देखभाल',
    pharmacyVisit: 'फार्मेसी जाएं',
    doctorConsult: 'डॉक्टर से सलाह लें',
    kioskMode: 'आशा वर्कर मोड',
    addPatient: 'नया मरीज़ जोड़ें',
    switchProfile: 'प्रोफाइल बदलें'
  },
  punjabi: {
    selectLanguage: 'ਆਪਣੀ ਭਾਸ਼ਾ ਚੁਣੋ',
    continue: 'ਜਾਰੀ ਰੱਖੋ',
    consultDoctor: 'ਡਾਕਟਰ ਨਾਲ ਸਲਾਹ ਕਰੋ',
    checkMedicines: 'ਦਵਾਈਆਂ ਦੇਖੋ',
    healthRecords: 'ਮੇਰੇ ਸਿਹਤ ਰਿਕਾਰਡ',
    symptomChecker: 'ਲੱਛਣ ਜਾਂਚਕਰਤਾ',
    offlineMode: 'ਔਫਲਾਈਨ ਮੋਡ',
    online: 'ਔਨਲਾਈਨ',
    offline: 'ਔਫਲਾਈਨ',
    welcome: 'ਟੈਲੀਮੈਡ ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ',
    yourHealth: 'ਤੁਹਾਡੀ ਸਿਹਤ, ਸਾਡੀ ਤਰਜੀਹ',
    doctorConsultation: 'ਡਾਕਟਰ ਸਲਾਹ',
    medicineAvailability: 'ਦਵਾਈ ਦੀ ਉਪਲਬਧਤਾ',
    myHealthRecords: 'ਮੇਰੇ ਸਿਹਤ ਰਿਕਾਰਡ',
    aiSymptomChecker: 'ਏਆਈ ਲੱਛਣ ਜਾਂਚਕਰਤਾ',
    communityMode: 'ਭਾਈਚਾਰਕ ਪਹੁੰਚ',
    bookAppointment: 'ਮੁਲਾਕਾਤ ਬੁੱਕ ਕਰੋ',
    startVideoCall: 'ਵੀਡੀਓ ਕਾਲ ਸ਼ੁਰੂ ਕਰੋ',
    voiceCall: 'ਆਵਾਜ਼ ਕਾਲ',
    chatWithDoctor: 'ਡਾਕਟਰ ਨਾਲ ਚੈਟ ਕਰੋ',
    searchMedicine: 'ਦਵਾਈ ਖੋਜੋ...',
    nearbyPharmacies: 'ਨੇੜਲੀ ਫਾਰਮੇਸੀ',
    available: 'ਉਪਲਬਧ',
    outOfStock: 'ਸਟਾਕ ਵਿੱਚ ਨਹੀਂ',
    patientCard: 'ਡਿਜੀਟਲ ਮਰੀਜ਼ ਕਾਰਡ',
    syncData: 'ਡੇਟਾ ਸਿੰਕ ਕਰੋ',
    pastConsultations: 'ਪਿਛਲੀ ਸਲਾਹ',
    describeSymptoms: 'ਆਪਣੇ ਲੱਛਣ ਦੱਸੋ',
    speakSymptoms: 'ਬੋਲਣ ਲਈ ਟੈਪ ਕਰੋ',
    homeCare: 'ਘਰੇਲੂ ਦੇਖਭਾਲ',
    pharmacyVisit: 'ਫਾਰਮੇਸੀ ਜਾਓ',
    doctorConsult: 'ਡਾਕਟਰ ਨਾਲ ਸਲਾਹ ਕਰੋ',
    kioskMode: 'ਆਸ਼ਾ ਵਰਕਰ ਮੋਡ',
    addPatient: 'ਨਵਾਂ ਮਰੀਜ਼ ਜੋੜੋ',
    switchProfile: 'ਪ੍ਰੋਫਾਈਲ ਬਦਲੋ'
  }
};

export default function TelemedicineApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('language');
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('english');
  const [isOnline, setIsOnline] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('list');
  const [isRecording, setIsRecording] = useState(false);
  const [currentPatient, setCurrentPatient] = useState('Rajesh Kumar');

  const t = translations[selectedLanguage];

  // Mock data
  const doctors = [
    { name: 'Dr. Priya Sharma', specialty: 'General Medicine', languages: ['Hindi', 'English'], rating: 4.8, available: true },
    { name: 'Dr. Amjit Singh', specialty: 'Pediatrician', languages: ['Punjabi', 'Hindi'], rating: 4.9, available: false },
    { name: 'Dr. Sarah Johnson', specialty: 'Cardiology', languages: ['English'], rating: 4.7, available: true }
  ];

  const medicines = [
    { name: 'Paracetamol', pharmacy: 'Local Pharmacy', distance: '0.5 km', available: true },
    { name: 'Crocin', pharmacy: 'Health Plus', distance: '1.2 km', available: false },
    { name: 'Amoxicillin', pharmacy: 'Care Chemist', distance: '0.8 km', available: true }
  ];

  const patients = [
    { name: 'Rajesh Kumar', age: 45, id: 'P001' },
    { name: 'Sunita Devi', age: 38, id: 'P002' },
    { name: 'Harpreet Singh', age: 52, id: 'P003' }
  ];

  useEffect(() => {
    // Simulate online/offline detection
    const interval = setInterval(() => {
      setIsOnline(Math.random() > 0.3); // 70% online chance
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);

  const LanguageSelectionScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900 dark:to-blue-900 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">TeleMed</h1>
          <p className="text-gray-600 dark:text-gray-300">Healthcare for Rural India</p>
        </div>

        <Card className="p-6 backdrop-blur-sm bg-white/90 dark:bg-gray-800/90">
          <h2 className="text-xl font-bold text-center mb-6 text-gray-900 dark:text-white">
            Select Your Language / भाषा चुनें / ਭਾਸ਼ਾ ਚੁਣੋ
          </h2>
          
          <div className="space-y-4">
            {[
              { key: 'english' as Language, label: 'English', flag: '🇬🇧' },
              { key: 'hindi' as Language, label: 'हिन्दी', flag: '🇮🇳' },
              { key: 'punjabi' as Language, label: 'ਪੰਜਾਬੀ', flag: '🇮🇳' }
            ].map((lang) => (
              <Button
                key={lang.key}
                variant={selectedLanguage === lang.key ? "default" : "outline"}
                className="w-full h-14 text-lg justify-start"
                onClick={() => setSelectedLanguage(lang.key)}
              >
                <span className="text-2xl mr-3">{lang.flag}</span>
                {lang.label}
              </Button>
            ))}
          </div>

          <Button 
            className="w-full mt-8 h-12 text-lg bg-green-600 hover:bg-green-700"
            onClick={() => setCurrentScreen('home')}
          >
            {t.continue} →
          </Button>
        </Card>
      </div>
    </div>
  );

  const HomeScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">{t.welcome}</h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">{t.yourHealth}</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              {isOnline ? <Wifi className="w-5 h-5 text-green-500" /> : <WifiOff className="w-5 h-5 text-red-500" />}
              <span className="text-xs ml-1 text-gray-600 dark:text-gray-300">
                {isOnline ? t.online : t.offline}
              </span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setCurrentScreen('language')}>
              <Globe className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          {[
            { icon: Video, label: t.consultDoctor, screen: 'doctor' as Screen, color: 'bg-blue-500' },
            { icon: Pill, label: t.checkMedicines, screen: 'medicine' as Screen, color: 'bg-green-500' },
            { icon: FileText, label: t.healthRecords, screen: 'records' as Screen, color: 'bg-purple-500' },
            { icon: Stethoscope, label: t.symptomChecker, screen: 'symptoms' as Screen, color: 'bg-red-500' }
          ].map((item, index) => (
            <Card 
              key={index}
              className="p-6 cursor-pointer hover:scale-105 transition-transform duration-200 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
              onClick={() => setCurrentScreen(item.screen)}
            >
              <div className={`w-12 h-12 ${item.color} rounded-full flex items-center justify-center mb-4 mx-auto`}>
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-center font-semibold text-gray-900 dark:text-white text-sm leading-tight">
                {item.label}
              </p>
            </Card>
          ))}
        </div>

        {/* Community Mode Access */}
        <Card className="p-4 bg-orange-50 dark:bg-orange-900/30 border-orange-200 dark:border-orange-800">
          <Button 
            variant="outline" 
            className="w-full border-orange-300 text-orange-700 dark:text-orange-300 hover:bg-orange-100 dark:hover:bg-orange-800"
            onClick={() => setCurrentScreen('community')}
          >
            <Users className="w-5 h-5 mr-2" />
            {t.communityMode}
          </Button>
        </Card>

        {/* Offline Indicator */}
        {!isOnline && (
          <Card className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-800">
            <div className="flex items-center">
              <WifiOff className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-2" />
              <span className="text-yellow-800 dark:text-yellow-200 text-sm">{t.offlineMode}</span>
            </div>
          </Card>
        )}
      </div>
    </div>
  );

  const DoctorConsultationScreen = () => (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" onClick={() => setCurrentScreen('home')}>
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <h1 className="ml-2 text-lg font-semibold text-gray-900 dark:text-white">{t.doctorConsultation}</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {doctors.map((doctor, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{doctor.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{doctor.specialty}</p>
                  <p className="text-xs text-gray-500">Languages: {doctor.languages.join(', ')}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center mb-1">
                  <span className="text-yellow-500">★</span>
                  <span className="text-sm ml-1 text-gray-600 dark:text-gray-300">{doctor.rating}</span>
                </div>
                <Badge variant={doctor.available ? "default" : "secondary"} className="text-xs">
                  {doctor.available ? 'Available' : 'Busy'}
                </Badge>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button size="sm" className="flex-1" disabled={!doctor.available}>
                <Video className="w-4 h-4 mr-2" />
                {t.startVideoCall}
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                <Phone className="w-4 h-4 mr-2" />
                {t.voiceCall}
              </Button>
            </div>

            <div className="flex space-x-2 mt-2">
              <Button size="sm" variant="outline" className="flex-1">
                <MessageCircle className="w-4 h-4 mr-2" />
                {t.chatWithDoctor}
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                <Calendar className="w-4 h-4 mr-2" />
                {t.bookAppointment}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const MedicineScreen = () => (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="sm" onClick={() => setCurrentScreen('home')}>
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <h1 className="ml-2 text-lg font-semibold text-gray-900 dark:text-white">{t.medicineAvailability}</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Input placeholder={t.searchMedicine} className="flex-1" />
          <Button size="sm" variant="outline" onClick={() => setViewMode(viewMode === 'list' ? 'map' : 'list')}>
            {viewMode === 'list' ? <Map className="w-4 h-4" /> : <List className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      <div className="p-4">
        <h2 className="font-semibold text-gray-900 dark:text-white mb-4">{t.nearbyPharmacies}</h2>
        <div className="space-y-3">
          {medicines.map((medicine, index) => (
            <Card key={index} className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{medicine.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{medicine.pharmacy}</p>
                  <p className="text-xs text-gray-500">{medicine.distance}</p>
                </div>
                <Badge variant={medicine.available ? "default" : "destructive"} className="bg-opacity-20">
                  <div className={`w-2 h-2 rounded-full mr-2 ${medicine.available ? 'bg-green-500' : 'bg-red-500'}`} />
                  {medicine.available ? t.available : t.outOfStock}
                </Badge>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Phone className="w-4 h-4 mr-2" />
                  Call
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Map className="w-4 h-4 mr-2" />
                  Directions
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const HealthRecordsScreen = () => (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" size="sm" onClick={() => setCurrentScreen('home')}>
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <h1 className="ml-2 text-lg font-semibold text-gray-900 dark:text-white">{t.myHealthRecords}</h1>
          </div>
          <Button size="sm" variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            {t.syncData}
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Digital Patient Card */}
        <Card className="p-6 bg-gradient-to-r from-blue-500 to-green-500 text-white">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-bold">{t.patientCard}</h2>
              <p className="text-blue-100">Rajesh Kumar</p>
              <p className="text-blue-100 text-sm">Age: 45 | ID: P001</p>
            </div>
            <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
              <QrCode className="w-10 h-10 text-gray-800" />
            </div>
          </div>
          <div className="flex space-x-4 text-sm">
            <div>
              <p className="text-blue-100">Blood Group</p>
              <p className="font-semibold">O+</p>
            </div>
            <div>
              <p className="text-blue-100">Last Visit</p>
              <p className="font-semibold">15 Jan 2024</p>
            </div>
          </div>
        </Card>

        {/* Past Consultations */}
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">{t.pastConsultations}</h3>
          {[
            { date: '15 Jan 2024', doctor: 'Dr. Priya Sharma', condition: 'Fever', prescription: 'Paracetamol 500mg' },
            { date: '10 Dec 2023', doctor: 'Dr. Amjit Singh', condition: 'Cold', prescription: 'Crocin, Rest' },
            { date: '25 Nov 2023', doctor: 'Dr. Sarah Johnson', condition: 'Headache', prescription: 'Aspirin' }
          ].map((record, index) => (
            <Card key={index} className="p-4 mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{record.condition}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{record.doctor}</p>
                  <p className="text-xs text-gray-500">{record.date}</p>
                </div>
                <Badge variant="outline">
                  <FileText className="w-3 h-3 mr-1" />
                  Prescription
                </Badge>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                <strong>Rx:</strong> {record.prescription}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const SymptomCheckerScreen = () => (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" onClick={() => setCurrentScreen('home')}>
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <h1 className="ml-2 text-lg font-semibold text-gray-900 dark:text-white">{t.aiSymptomChecker}</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Voice Input */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t.describeSymptoms}</h2>
          <div className="flex flex-col items-center space-y-4">
            <Button 
              size="lg" 
              variant={isRecording ? "destructive" : "default"}
              className="w-24 h-24 rounded-full"
              onClick={() => setIsRecording(!isRecording)}
            >
              {isRecording ? <X className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
            </Button>
            <p className="text-center text-gray-600 dark:text-gray-300">
              {isRecording ? 'Listening...' : t.speakSymptoms}
            </p>
          </div>
        </Card>

        {/* Text Input */}
        <Card className="p-4">
          <Input 
            placeholder="Type your symptoms here..."
            className="mb-4"
          />
          <Button className="w-full">
            <Search className="w-4 h-4 mr-2" />
            Analyze Symptoms
          </Button>
        </Card>

        {/* Common Symptoms */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Common Symptoms</h3>
          <div className="grid grid-cols-2 gap-2">
            {['Fever', 'Headache', 'Cough', 'Cold', 'Stomach Pain', 'Weakness'].map((symptom) => (
              <Button key={symptom} variant="outline" size="sm">
                {symptom}
              </Button>
            ))}
          </div>
        </Card>

        {/* Recommendations */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Recommendations</h3>
          <div className="space-y-3">
            {[
              { type: t.homeCare, icon: Home, color: 'text-green-600', bgColor: 'bg-green-50' },
              { type: t.pharmacyVisit, icon: Pill, color: 'text-yellow-600', bgColor: 'bg-yellow-50' },
              { type: t.doctorConsult, icon: Stethoscope, color: 'text-red-600', bgColor: 'bg-red-50' }
            ].map((rec, index) => (
              <div key={index} className={`flex items-center p-3 rounded-lg ${rec.bgColor}`}>
                <rec.icon className={`w-5 h-5 ${rec.color} mr-3`} />
                <span className={`font-semibold ${rec.color}`}>{rec.type}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );

  const CommunityModeScreen = () => (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" size="sm" onClick={() => setCurrentScreen('home')}>
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <h1 className="ml-2 text-lg font-semibold text-gray-900 dark:text-white">{t.kioskMode}</h1>
          </div>
          <Badge variant="secondary">
            <Shield className="w-3 h-3 mr-1" />
            ASHA Worker
          </Badge>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Current Patient */}
        <Card className="p-4 border-2 border-blue-200 dark:border-blue-800">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-semibold text-gray-900 dark:text-white">Current Patient</h2>
            <Button size="sm" variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              {t.addPatient}
            </Button>
          </div>
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-3">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">{currentPatient}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Age: 45 | ID: P001</p>
            </div>
          </div>
        </Card>

        {/* Patient List */}
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">{t.switchProfile}</h3>
          {patients.map((patient) => (
            <Card 
              key={patient.id} 
              className={`p-4 mb-3 cursor-pointer transition-colors ${
                currentPatient === patient.name 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                  : 'hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
              onClick={() => setCurrentPatient(patient.name)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center mr-3">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{patient.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Age: {patient.age} | ID: {patient.id}</p>
                  </div>
                </div>
                {currentPatient === patient.name && (
                  <Check className="w-5 h-5 text-blue-500" />
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" onClick={() => setCurrentScreen('doctor')}>
              <Video className="w-4 h-4 mr-2" />
              Consult
            </Button>
            <Button variant="outline" size="sm" onClick={() => setCurrentScreen('symptoms')}>
              <Stethoscope className="w-4 h-4 mr-2" />
              Symptoms
            </Button>
            <Button variant="outline" size="sm" onClick={() => setCurrentScreen('records')}>
              <FileText className="w-4 h-4 mr-2" />
              Records
            </Button>
            <Button variant="outline" size="sm" onClick={() => setCurrentScreen('medicine')}>
              <Pill className="w-4 h-4 mr-2" />
              Medicine
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderScreen = () => {
    switch (currentScreen) {
      case 'language': return <LanguageSelectionScreen />;
      case 'home': return <HomeScreen />;
      case 'doctor': return <DoctorConsultationScreen />;
      case 'medicine': return <MedicineScreen />;
      case 'records': return <HealthRecordsScreen />;
      case 'symptoms': return <SymptomCheckerScreen />;
      case 'community': return <CommunityModeScreen />;
      default: return <HomeScreen />;
    }
  };

  return (
    <div className={`${isDarkMode ? 'dark' : ''}`}>
      <div className="max-w-md mx-auto bg-white dark:bg-gray-900 min-h-screen relative">
        {renderScreen()}
        
        {/* Dark Mode Toggle (Fixed Position) */}
        <div className="fixed bottom-4 right-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="rounded-full w-10 h-10 p-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </Button>
        </div>
      </div>
    </div>
  );
}