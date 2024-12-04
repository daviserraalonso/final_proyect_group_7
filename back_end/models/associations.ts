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

export default function setupAssociations() {
  // ** Relation User -> UserDetails**
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

  // ** Relation Course -> User (Profesor)**
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

  // ** Relation Course -> Modality**
  Course.belongsTo(Modality, {
    foreignKey: {
      name: 'modality_id',
      allowNull: false,
    },
    as: 'modality',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  // association StudentCourse -> Course
  StudentCourse.belongsTo(Course, {
    foreignKey: 'courseId',
    as: 'course',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
  

  // association Course -> StudentCourse
  Course.hasMany(StudentCourse, {
    foreignKey: 'courseId',
    as: 'studentCourses',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });


  // ** Relation Subject -> Course**
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

  // ** Relation CourseEvent -> Subject**
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

  // ** Relation StudentCourse -> User (Estudiante)**
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

  // ** Relation Chat -> User (Profesor)**
  Chat.belongsTo(User, {
    foreignKey: {
      name: 'professorId',
      allowNull: false,
    },
    as: 'professor',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  // ** Relation Chat -> User (Estudiante)**
  Chat.belongsTo(User, {
    foreignKey: {
      name: 'studentId',
      allowNull: false,
    },
    as: 'student',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  // ** Relation Message -> Chat**
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
    as: 'message',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  // ** Relation Message -> User (Sender)**
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

  // ** Relation Course -> Category**
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

  // **Relación User -> Profesor Rating**
  User.hasOne(AvgTeacher,{
    as: 'averageTeacher',
    foreignKey: 'id'
  })

  //**Relación Profesor Rating -> avg_teacher */
  ProfessorRating.hasOne(AvgTeacher, {
    foreignKey: 'professorId',
    as: 'averageTeacher'
  })

  //**Relación Profesor Rating -> avg_course ->  */
  ProfessorRating.hasOne(AvgCourse, {
    foreignKey: 'courseId',
    as: 'averageCourse'
  })


  // relation avgTeacher user
  AvgTeacher.belongsTo(User, {
    foreignKey: 'professorId',
    as: 'User'
  });

  User.hasMany(AvgTeacher, {
    foreignKey: 'professorId',
    as: 'AvgTeacher'
  });



}
