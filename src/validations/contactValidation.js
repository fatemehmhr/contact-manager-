import * as Yup from 'yup';

export const contactSchema = Yup.object().shape({
    fullname:Yup.string().required('نام و نام خانوادگی الزامی می باشد.'),
    photo:Yup.string().url('آدرس معتبر نیست').required('تصویر مخاطب الزامی می باشد.'),
    mobile:Yup.number().required('شاره موبایل الزامی می باشد.'),
    email:Yup.string().email('آدرس ایمیل معتبر نیست').required('آدرس ایمیل الزامی می باشد.'),
    job:Yup.string().required('شغل الزامی می باشد.'),
    group:Yup.string().required('وارد کردن گروه الزامی می باشد.')
})