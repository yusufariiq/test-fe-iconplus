export interface UnitData {
    id: string
    officeName: string
}

export interface MeetingRoomData {
    id: string 
    roomName: string
    capacity: number
    officeId: string
    officeName: string
}

export interface ConsumptionTypeData {
    id: string
    name: string
    maxPrice: number
}

export interface BookingFormProps {
    onCancel: () => void
    onSave: (data: any) => void
}

export interface MappedConsumptionType extends ConsumptionTypeData {
    condition: (startTime: string, endTime: string) => boolean;
    ruleKey: string;
}
  
export interface BookingFormData {
    unitId: string;
    meetingRoomId: string;
    meetingDate: string;
    startTime: string;
    endTime: string;
    participantCount: string;
    consumptionTypes: string[];
    totalAmount: number;
}