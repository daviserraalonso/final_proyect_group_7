let eventGuid = 0;

export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: 'Evento 1',
    start: '2023-10-01T10:00:00',
    end: '2023-10-01T12:00:00'
  },
  {
    id: createEventId(),
    title: 'Evento 2',
    start: '2023-10-02T14:00:00',
    end: '2023-10-02T16:00:00'
  }
];

export function createEventId() {
  return String(eventGuid++);
}