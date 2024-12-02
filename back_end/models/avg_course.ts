import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class AvgCourse extends Model {

}

AvgCourse.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        courseId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'courseId',
        },
        avg: {
            type: DataTypes.FLOAT,
            allowNull: false,
            field: 'avg'
        }
    },
    {
        sequelize,
        modelName: 'AvgCourse',
        tableName: 'avg_course',
        timestamps: false,
    }
);

export default AvgCourse