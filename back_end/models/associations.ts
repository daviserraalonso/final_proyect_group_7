import UserDetails from './UserDetails';
import Course from './Course';
import StudentCourse from './StudentCourse';
import Modality from './Modality';
import Subject from './Subject';
import CourseEvent from './CourseEvent';
import Chat from './Chat';
import Message from './Message';
import CourseLocation from './CourseLocation';
import Category from './Category';
import ProfessorRating from './ProfessorRating';
import AvgTeacher from './avg_teacher'
import AvgCourse from './avg_course';
import User from './User';
import Task from './Task';

export default function setupAssociations() {
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

  CourseEvent.belongsTo(Course, {
    foreignKey: {
      name: 'courseId',
      allowNull: false,
    },
    as: 'course',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

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


  CourseEvent.belongsTo(User, {
    foreignKey: {
      name: 'professorId',
      allowNull: false,
    },
    as: 'professor',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  User.hasMany(CourseEvent, {
    foreignKey: {
      name: 'professorId',
      allowNull: false,
    },
    as: 'events',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });


  Course.belongsTo(Modality, {
    foreignKey: 'modality_id',
    as: 'modality', // 
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    constraints: false,
  });

  StudentCourse.belongsTo(Course, {
    foreignKey: 'courseId',
    as: 'course',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  Course.hasMany(CourseEvent, {
    foreignKey: {
      name: 'courseId',
      allowNull: false,
    },
    as: 'events',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });


  Course.hasMany(StudentCourse, {
    foreignKey: 'courseId',
    as: 'studentCourses',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });


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

  Chat.belongsTo(User, {
    foreignKey: {
      name: 'professorId',
      allowNull: false,
    },
    as: 'professor',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  Chat.belongsTo(User, {
    foreignKey: {
      name: 'studentId',
      allowNull: false,
    },
    as: 'student',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

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

  Message.belongsTo(User, {
    foreignKey: {
      name: 'senderId',
      allowNull: false,
    },
    as: 'sender',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  User.hasMany(Message, {
    foreignKey: {
      name: 'senderId',
      allowNull: false,
    },
    as: 'sentMessages',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  Course.belongsTo(Category, {
    foreignKey: {
      name: 'category_id',
      allowNull: false,
    },
    as: 'category',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  Category.hasMany(Course, {
    foreignKey: {
      name: 'category_id',
      allowNull: false,
    },
    as: 'courses',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  User.hasOne(AvgTeacher, {
    as: 'averageTeacher',
    foreignKey: 'id'
  })

  ProfessorRating.hasOne(AvgTeacher, {
    foreignKey: 'professorId',
    as: 'averageTeacher'
  })

  ProfessorRating.hasOne(AvgCourse, {
    foreignKey: 'courseId',
    as: 'averageCourse'
  })



  AvgTeacher.belongsTo(User, {
    foreignKey: 'professorId',
    as: 'User'
  });

  User.hasMany(AvgTeacher, {
    foreignKey: 'professorId',
    as: 'AvgTeacher'
  });

  Course.hasOne(AvgCourse, {
    foreignKey: 'courseId',
    as: 'averageCourse'
  })


  Task.belongsTo(Course, {
    foreignKey: {
      name: 'subjectId',
      allowNull: false,
    },
    as: 'course',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  Course.hasMany(Task, {
    foreignKey: {
      name: 'subjectId',
      allowNull: false,
    },
    as: 'tasks',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })



}
