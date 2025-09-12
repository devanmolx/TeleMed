import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Calendar, Clock, Video, Phone, MessageSquare, Star, Globe, User } from 'lucide-react-native';

const mockDoctor = {
  id: '1',
  name: 'Dr. Priya Sharma',
  specialty: 'General Medicine',
  languages: ['Hindi', 'English', 'Punjabi'],
  rating: 4.8,
  experience: '8 years',
  consultationFee: 200,
  image: '👩‍⚕️',
  bio: 'Experienced general physician with expertise in rural healthcare. Fluent in multiple languages and committed to providing accessible healthcare.',
  qualifications: ['MBBS', 'MD General Medicine'],
  availability: {
    today: ['2:00 PM', '3:30 PM', '4:00 PM', '5:30 PM'],
    tomorrow: ['10:00 AM', '11:30 AM', '2:00 PM', '3:30 PM', '4:00 PM'],
    dayAfter: ['9:00 AM', '10:30 AM', '2:00 PM', '4:00 PM']
  }
};

const consultationTypes = [
  {
    id: 'video',
    name: 'Video Call',
    hindi: 'वीडियो कॉल',
    punjabi: 'ਵੀਡੀਓ ਕਾਲ',
    icon: Video,
    price: 200,
    duration: '15-20 mins',
    color: '#22C55E'
  },
  {
    id: 'audio',
    name: 'Audio Call',
    hindi: 'ऑडियो कॉल',
    punjabi: 'ਆਡੀਓ ਕਾਲ',
    icon: Phone,
    price: 150,
    duration: '10-15 mins',
    color: '#3B82F6'
  },
  {
    id: 'chat',
    name: 'Text Chat',
    hindi: 'टेक्स्ट चैट',
    punjabi: 'ਟੈਕਸਟ ਚੈਟ',
    icon: MessageSquare,
    price: 100,
    duration: '24 hours',
    color: '#8B5CF6'
  }
];

const languages = {
  en: {
    bookAppointment: 'Book Appointment',
    selectDate: 'Select Date',
    selectTime: 'Select Time Slot',
    consultationType: 'Consultation Type',
    today: 'Today',
    tomorrow: 'Tomorrow',
    dayAfter: 'Day After Tomorrow',
    confirmBooking: 'Confirm Booking',
    totalAmount: 'Total Amount',
    bookingConfirmed: 'Booking Confirmed!',
    bookingSuccess: 'Your appointment has been booked successfully. You will receive a confirmation message shortly.',
    noSlotsAvailable: 'No slots available',
    selectSlot: 'Please select a time slot',
    selectConsultation: 'Please select consultation type'
  },
  hi: {
    bookAppointment: 'अपॉइंटमेंट बुक करें',
    selectDate: 'तारीख चुनें',
    selectTime: 'समय स्लॉट चुनें',
    consultationType: 'परामर्श प्रकार',
    today: 'आज',
    tomorrow: 'कल',
    dayAfter: 'परसों',
    confirmBooking: 'बुकिंग की पुष्टि करें',
    totalAmount: 'कुल राशि',
    bookingConfirmed: 'बुकिंग की पुष्टि हो गई!',
    bookingSuccess: 'आपकी अपॉइंटमेंट सफलतापूर्वक बुक हो गई है। आपको जल्द ही पुष्टि संदेश मिलेगा।',
    noSlotsAvailable: 'कोई स्लॉट उपलब्ध नहीं',
    selectSlot: 'कृपया समय स्लॉट चुनें',
    selectConsultation: 'कृपया परामर्श प्रकार चुनें'
  },
  pa: {
    bookAppointment: 'ਅਪਾਇੰਟਮੈਂਟ ਬੁੱਕ ਕਰੋ',
    selectDate: 'ਤਾਰੀਖ ਚੁਣੋ',
    selectTime: 'ਸਮਾਂ ਸਲਾਟ ਚੁਣੋ',
    consultationType: 'ਸਲਾਹ ਦੀ ਕਿਸਮ',
    today: 'ਅੱਜ',
    tomorrow: 'ਕੱਲ੍ਹ',
    dayAfter: 'ਪਰਸੋਂ',
    confirmBooking: 'ਬੁਕਿੰਗ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ',
    totalAmount: 'ਕੁੱਲ ਰਕਮ',
    bookingConfirmed: 'ਬੁਕਿੰਗ ਦੀ ਪੁਸ਼ਟੀ ਹੋ ਗਈ!',
    bookingSuccess: 'ਤੁਹਾਡੀ ਅਪਾਇੰਟਮੈਂਟ ਸਫਲਤਾਪੂਰਵਕ ਬੁੱਕ ਹੋ ਗਈ ਹੈ। ਤੁਹਾਨੂੰ ਜਲਦੀ ਹੀ ਪੁਸ਼ਟੀ ਸੁਨੇਹਾ ਮਿਲੇਗਾ।',
    noSlotsAvailable: 'ਕੋਈ ਸਲਾਟ ਉਪਲਬਧ ਨਹੀਂ',
    selectSlot: 'ਕਿਰਪਾ ਕਰਕੇ ਸਮਾਂ ਸਲਾਟ ਚੁਣੋ',
    selectConsultation: 'ਕਿਰਪਾ ਕਰਕੇ ਸਲਾਹ ਦੀ ਕਿਸਮ ਚੁਣੋ'
  }
};

export default function BookingScreen() {
  const { doctorId } = useLocalSearchParams();
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'hi' | 'pa'>('en');
  const [selectedDate, setSelectedDate] = useState('today');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedConsultationType, setSelectedConsultationType] = useState('');
  const [isBooking, setIsBooking] = useState(false);

  const t = languages[currentLanguage];

  const getAvailableSlots = () => {
    switch (selectedDate) {
      case 'today':
        return mockDoctor.availability.today;
      case 'tomorrow':
        return mockDoctor.availability.tomorrow;
      case 'dayAfter':
        return mockDoctor.availability.dayAfter;
      default:
        return [];
    }
  };

  const getSelectedConsultation = () => {
    return consultationTypes.find(type => type.id === selectedConsultationType);
  };

  const handleBooking = async () => {
    if (!selectedTime) {
      Alert.alert('Error', t.selectSlot);
      return;
    }
    
    if (!selectedConsultationType) {
      Alert.alert('Error', t.selectConsultation);
      return;
    }

    setIsBooking(true);
    
    // Simulate booking API call
    setTimeout(() => {
      setIsBooking(false);
      Alert.alert(
        t.bookingConfirmed,
        t.bookingSuccess,
        [
          {
            text: 'OK',
            onPress: () => router.back()
          }
        ]
      );
    }, 2000);
  };

  const DateButton = ({ dateKey, label }: { dateKey: string, label: string }) => (
    <TouchableOpacity
      style={[
        styles.dateButton,
        selectedDate === dateKey && styles.selectedDateButton
      ]}
      onPress={() => {
        setSelectedDate(dateKey);
        setSelectedTime(''); // Reset time selection when date changes
      }}
    >
      <Text style={[
        styles.dateButtonText,
        selectedDate === dateKey && styles.selectedDateButtonText
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const TimeSlot = ({ time }: { time: string }) => (
    <TouchableOpacity
      style={[
        styles.timeSlot,
        selectedTime === time && styles.selectedTimeSlot
      ]}
      onPress={() => setSelectedTime(time)}
    >
      <Text style={[
        styles.timeSlotText,
        selectedTime === time && styles.selectedTimeSlotText
      ]}>
        {time}
      </Text>
    </TouchableOpacity>
  );

  const ConsultationTypeCard = ({ type }: { type: any }) => {
    const IconComponent = type.icon;
    const isSelected = selectedConsultationType === type.id;
    
    return (
      <TouchableOpacity
        style={[
          styles.consultationCard,
          isSelected && { borderColor: type.color, backgroundColor: `${type.color}10` }
        ]}
        onPress={() => setSelectedConsultationType(type.id)}
      >
        <View style={[styles.consultationIcon, { backgroundColor: type.color }]}>
          <IconComponent size={24} color="#FFFFFF" />
        </View>
        <View style={styles.consultationInfo}>
          <Text style={styles.consultationName}>{type.name}</Text>
          <Text style={styles.consultationPrice}>₹{type.price}</Text>
          <Text style={styles.consultationDuration}>{type.duration}</Text>
        </View>
        {isSelected && (
          <View style={styles.selectedIndicator}>
            <Text style={styles.selectedIndicatorText}>✓</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color="#1F2937" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t.bookAppointment}</Text>
        </View>

        {/* Doctor Info */}
        <View style={styles.doctorCard}>
          <View style={styles.doctorAvatar}>
            <Text style={styles.doctorAvatarText}>{mockDoctor.image}</Text>
          </View>
          <View style={styles.doctorInfo}>
            <Text style={styles.doctorName}>{mockDoctor.name}</Text>
            <Text style={styles.doctorSpecialty}>{mockDoctor.specialty}</Text>
            <View style={styles.doctorMeta}>
              <View style={styles.ratingContainer}>
                <Star size={16} color="#F59E0B" fill="#F59E0B" />
                <Text style={styles.rating}>{mockDoctor.rating}</Text>
              </View>
              <Text style={styles.experience}>{mockDoctor.experience}</Text>
            </View>
            <View style={styles.languageContainer}>
              <Globe size={16} color="#6B7280" />
              <Text style={styles.languages}>{mockDoctor.languages.join(', ')}</Text>
            </View>
          </View>
        </View>

        {/* Date Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.selectDate}</Text>
          <View style={styles.dateButtons}>
            <DateButton dateKey="today" label={t.today} />
            <DateButton dateKey="tomorrow" label={t.tomorrow} />
            <DateButton dateKey="dayAfter" label={t.dayAfter} />
          </View>
        </View>

        {/* Time Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.selectTime}</Text>
          <View style={styles.timeSlots}>
            {getAvailableSlots().length > 0 ? (
              getAvailableSlots().map((time, index) => (
                <TimeSlot key={index} time={time} />
              ))
            ) : (
              <Text style={styles.noSlotsText}>{t.noSlotsAvailable}</Text>
            )}
          </View>
        </View>

        {/* Consultation Type */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.consultationType}</Text>
          <View style={styles.consultationTypes}>
            {consultationTypes.map((type) => (
              <ConsultationTypeCard key={type.id} type={type} />
            ))}
          </View>
        </View>

        {/* Booking Summary */}
        {selectedConsultationType && (
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>{t.totalAmount}</Text>
            <Text style={styles.summaryAmount}>₹{getSelectedConsultation()?.price}</Text>
          </View>
        )}

        {/* Confirm Button */}
        <TouchableOpacity
          style={[
            styles.confirmButton,
            (!selectedTime || !selectedConsultationType || isBooking) && styles.confirmButtonDisabled
          ]}
          onPress={handleBooking}
          disabled={!selectedTime || !selectedConsultationType || isBooking}
        >
          <Text style={styles.confirmButtonText}>
            {isBooking ? 'Booking...' : t.confirmBooking}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  doctorCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  doctorAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  doctorAvatarText: {
    fontSize: 32,
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  doctorSpecialty: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 8,
  },
  doctorMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  rating: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '600',
    color: '#F59E0B',
  },
  experience: {
    fontSize: 14,
    color: '#6B7280',
  },
  languageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languages: {
    marginLeft: 8,
    fontSize: 14,
    color: '#6B7280',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  dateButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  dateButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  selectedDateButton: {
    borderColor: '#22C55E',
    backgroundColor: '#F0FDF4',
  },
  dateButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  selectedDateButtonText: {
    color: '#22C55E',
  },
  timeSlots: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  timeSlot: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  selectedTimeSlot: {
    borderColor: '#3B82F6',
    backgroundColor: '#EFF6FF',
  },
  timeSlotText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  selectedTimeSlotText: {
    color: '#3B82F6',
  },
  noSlotsText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    padding: 20,
  },
  consultationTypes: {
    gap: 12,
  },
  consultationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  consultationIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  consultationInfo: {
    flex: 1,
  },
  consultationName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  consultationPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#22C55E',
    marginBottom: 2,
  },
  consultationDuration: {
    fontSize: 12,
    color: '#6B7280',
  },
  selectedIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#22C55E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedIndicatorText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  summaryAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#22C55E',
  },
  confirmButton: {
    backgroundColor: '#22C55E',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  confirmButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});