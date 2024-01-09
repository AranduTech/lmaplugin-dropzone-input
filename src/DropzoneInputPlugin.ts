import { addFilter } from '@arandu/laravel-mui-admin';

import { LaravelMuiAdminPlugin } from '@arandu/laravel-mui-admin/lib/types/plugin';

import DropzoneInputComponent from './components/DropzoneInputComponent';

const DropzoneInputPlugin: LaravelMuiAdminPlugin = {

    macros: () => {

        addFilter('form_field_type_mapping', (mapping: any) => ({
            ...mapping,
            dropzone: DropzoneInputComponent,
        }));

    },

};

export default DropzoneInputPlugin;