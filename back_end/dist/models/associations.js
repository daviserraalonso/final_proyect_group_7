"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = setupAssociations;
const User_1 = __importDefault(require("./User"));
const UserDetails_1 = __importDefault(require("./UserDetails"));
const Course_1 = __importDefault(require("./Course"));
const StudentCourse_1 = __importDefault(require("./StudentCourse"));
const Modality_1 = __importDefault(require("./Modality"));
const Subject_1 = __importDefault(require("./Subject"));
const CourseEvent_1 = __importDefault(require("./CourseEvent"));
const Chat_1 = __importDefault(require("./Chat"));
const Message_1 = __importDefault(require("./Message"));
const CourseLocation_1 = __importDefault(require("./CourseLocation"));
function setupAssociations() {
    // **Relación User -> UserDetails**
    User_1.default.hasOne(UserDetails_1.default, {
        foreignKey: {
            name: 'userId',
            allowNull: false,
        },
        as: 'details',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });
    UserDetails_1.default.belongsTo(User_1.default, {
        foreignKey: {
            name: 'userId',
            allowNull: false,
        },
        as: 'user',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });
    // **Relación Course -> User (Profesor)**
    Course_1.default.belongsTo(User_1.default, {
        foreignKey: {
            name: 'professor_id',
            allowNull: false,
        },
        as: 'professor',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });
    User_1.default.hasMany(Course_1.default, {
        foreignKey: {
            name: 'professor_id',
            allowNull: false,
        },
        as: 'coursesTaught',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });
    // **Relación Course -> Modality**
    Course_1.default.belongsTo(Modality_1.default, {
        foreignKey: {
            name: 'modality_id',
            allowNull: false,
        },
        as: 'modality',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });
    // **Relación Course -> StudentCourse**
    Course_1.default.hasMany(StudentCourse_1.default, {
        foreignKey: {
            name: 'courseId',
            allowNull: false,
        },
        as: 'studentCourses',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });
    StudentCourse_1.default.belongsTo(Course_1.default, {
        foreignKey: {
            name: 'courseId',
            allowNull: false,
        },
        as: 'course',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });
    // **Relación Subject -> Course**
    Subject_1.default.belongsTo(Course_1.default, {
        foreignKey: {
            name: 'courseId',
            allowNull: false,
        },
        as: 'course',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });
    Course_1.default.hasMany(Subject_1.default, {
        foreignKey: {
            name: 'courseId',
            allowNull: false,
        },
        as: 'subjects',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });
    // **Relación CourseEvent -> Subject**
    CourseEvent_1.default.belongsTo(Subject_1.default, {
        foreignKey: {
            name: 'subjectId',
            allowNull: true,
        },
        as: 'subject',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });
    CourseEvent_1.default.belongsTo(CourseLocation_1.default, {
        foreignKey: {
            name: 'locationId',
            allowNull: true,
        },
        as: 'location',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    });
    // **Relación StudentCourse -> User (Estudiante)**
    StudentCourse_1.default.belongsTo(User_1.default, {
        foreignKey: {
            name: 'studentId',
            allowNull: false,
        },
        as: 'student',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });
    User_1.default.hasMany(StudentCourse_1.default, {
        foreignKey: {
            name: 'studentId',
            allowNull: false,
        },
        as: 'courses',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });
    // **Relación Chat -> Course**
    Chat_1.default.belongsTo(Course_1.default, {
        foreignKey: {
            name: 'courseId',
            allowNull: false,
        },
        as: 'course',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });
    // **Relación Chat -> User (Profesor)**
    Chat_1.default.belongsTo(User_1.default, {
        foreignKey: {
            name: 'professorId',
            allowNull: false,
        },
        as: 'professor',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });
    // **Relación Chat -> User (Estudiante)**
    Chat_1.default.belongsTo(User_1.default, {
        foreignKey: {
            name: 'studentId',
            allowNull: false,
        },
        as: 'student',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });
    // **Relación Message -> Chat**
    Message_1.default.belongsTo(Chat_1.default, {
        foreignKey: {
            name: 'chatId',
            allowNull: false,
        },
        as: 'chat',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });
    Chat_1.default.hasMany(Message_1.default, {
        foreignKey: {
            name: 'chatId',
            allowNull: false,
        },
        as: 'messages',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });
    // **Relación Message -> User (Sender)**
    Message_1.default.belongsTo(User_1.default, {
        foreignKey: {
            name: 'senderId',
            allowNull: false,
        },
        as: 'sender',
        onDelete: 'CASCADE', // Cambia a SET NULL si es necesario
        onUpdate: 'CASCADE',
    });
    User_1.default.hasMany(Message_1.default, {
        foreignKey: {
            name: 'senderId',
            allowNull: false,
        },
        as: 'sentMessages',
        onDelete: 'CASCADE', // Cambia a SET NULL si es necesario
        onUpdate: 'CASCADE',
    });
}
