import User from './User';
import UserDetails from './UserDetails';
import Course from './Course';
import StudentCourse from './StudentCourse';
import Modality from './Modality';
import Subject from './Subject';
import CourseEvent from './CourseEvent';
import Chat from './Chat';
import Message from './Message';
import CourseLocation from './CourseLocation';

export default function setupAssociations() {
  // **Relación User -> UserDetails**
  User.hasOne(UserDetails, {
    foreignKey: {
      name: 'userId',
      allowNull: false,
    },
    as: 'details',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  UserDetails.belongsTo(User, {
    foreignKey: {
      name: 'userId',
      allowNull: false,
    },
    as: 'user',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  // **Relación Course -> User (Profesor)**
  Course.belongsTo(User, {
    foreignKey: {
      name: 'professor_id',
      allowNull: false,
    },
    as: 'professor',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  User.hasMany(Course, {
    foreignKey: {
      name: 'professor_id',
      allowNull: false,
    },
    as: 'coursesTaught',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  // **Relación Course -> Modality**
  Course.belongsTo(Modality, {
    foreignKey: {
      name: 'modality_id',
      allowNull: false,
    },
    as: 'modality',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  // **Relación Course -> StudentCourse**
  Course.hasMany(StudentCourse, {
    foreignKey: {
      name: 'courseId',
      allowNull: false,
    },
    as: 'studentCourses',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  StudentCourse.belongsTo(Course, {
    foreignKey: {
      name: 'courseId',
      allowNull: false,
    },
    as: 'course',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  // **Relación Subject -> Course**
  Subject.belongsTo(Course, {
    foreignKey: {
      name: 'courseId',
      allowNull: false,
    },
    as: 'course',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  Course.hasMany(Subject, {
    foreignKey: {
      name: 'courseId',
      allowNull: false,
    },
    as: 'subjects',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  // **Relación CourseEvent -> Subject**
  CourseEvent.belongsTo(Subject, {
    foreignKey: {
      name: 'subjectId',
      allowNull: true,
    },
    as: 'subject',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  CourseEvent.belongsTo(CourseLocation, {
    foreignKey: {
      name: 'locationId',
      allowNull: true,
    },
    as: 'location',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  });

  // **Relación StudentCourse -> User (Estudiante)**
  StudentCourse.belongsTo(User, {
    foreignKey: {
      name: 'studentId',
      allowNull: false,
    },
    as: 'student',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  User.hasMany(StudentCourse, {
    foreignKey: {
      name: 'studentId',
      allowNull: false,
    },
    as: 'courses',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  // **Relación Chat -> Course**
  Chat.belongsTo(Course, {
    foreignKey: {
      name: 'courseId',
      allowNull: false,
    },
    as: 'course',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  // **Relación Chat -> User (Profesor)**
  Chat.belongsTo(User, {
    foreignKey: {
      name: 'professorId',
      allowNull: false,
    },
    as: 'professor',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  // **Relación Chat -> User (Estudiante)**
  Chat.belongsTo(User, {
    foreignKey: {
      name: 'studentId',
      allowNull: false,
    },
    as: 'student',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  // **Relación Message -> Chat**
  Message.belongsTo(Chat, {
    foreignKey: {
      name: 'chatId',
      allowNull: false,
    },
    as: 'chat',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  
  Chat.hasMany(Message, {
    foreignKey: {
      name: 'chatId',
      allowNull: false,
    },
    as: 'messages',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  // **Relación Message -> User (Sender)**
  Message.belongsTo(User, {
    foreignKey: {
      name: 'senderId',
      allowNull: false,
    },
    as: 'sender',
    onDelete: 'CASCADE', // Cambia a SET NULL si es necesario
    onUpdate: 'CASCADE',
  });

  User.hasMany(Message, {
    foreignKey: {
      name: 'senderId',
      allowNull: false,
    },
    as: 'sentMessages',
    onDelete: 'CASCADE', // Cambia a SET NULL si es necesario
    onUpdate: 'CASCADE',
  });
}
