import { useFormik } from 'formik';
import { forwardRef, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import EditorField from 'components/EditorField';
import InputField from 'components/InputField';
import SelectField from 'components/SelectField';
import { ProjectUpdateModel } from 'models/projectModel';
import { RootState, useAppDispatch } from 'redux/configureStore';
import { projectThunk } from 'redux/thunks/projectThunk';
import styles from './styles.module.scss';

const ProjectEditSchema = Yup.object().shape({
  projectName: Yup.string().required('Please provide an issue name.'),
});

interface Props {}

const ProjectEditForm = forwardRef<HTMLFormElement, Props>((props, ref) => {
  const dispatch = useAppDispatch();

  // get projectEdit from redux store
  const { projectCategoryList } = useSelector((state: RootState) => state.options);
  const { projectEdit } = useSelector((state: RootState) => state.project);

  // Formik
  const initialValues: ProjectUpdateModel = useMemo(() => {
    if (projectEdit) {
      return projectEdit;
    } else {
      return {
        id: 0,
        projectName: '',
        creator: 0,
        description: '',
        categoryId: '',
      };
    }
  }, [projectEdit]);

  const { values, errors, touched, handleSubmit, handleChange, handleBlur, setFieldValue } = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: ProjectEditSchema,
    onSubmit: async (values: ProjectUpdateModel) => {
      try {
        await dispatch(projectThunk.updateProject(values)).unwrap();
        toast.success('Edit a project successfully.');
      } catch (err) {
        if (typeof err === 'string') {
          if (err === 'Project không phải của bạn đâu đừng yodate, nhiều bạn phàn nàn lắm đó !') {
            toast.error('You can only edit your own project.');
          } else {
            toast.error(err);
          }
        } else {
          toast.error('Failed to edit a project.');
        }
      }
    },
  });

  return (
    <div className={styles.projectEditFormWrapper}>
      <form
        className={styles.form}
        onSubmit={handleSubmit}
        ref={ref}
      >
        <div className={styles.row}>
          <InputField
            label='Project name'
            name='projectName'
            value={values.projectName}
            error={errors.projectName}
            touched={touched.projectName}
            placeholder='Insert project name'
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>

        <div className={styles.row}>
          <EditorField
            label='Desciption'
            name='description'
            height={250}
            value={values.description}
            setFieldValue={setFieldValue}
          />
        </div>

        <div className={styles.row}>
          <SelectField
            label='Project Category'
            name='categoryId'
            defaultValue={Number(values.categoryId)}
            value={Number(values.categoryId)}
            list={projectCategoryList}
            listLabel='projectCategoryName'
            listValue='id'
            setFieldValue={setFieldValue}
          />
        </div>
      </form>
    </div>
  );
});

export default ProjectEditForm;
