import { addFilter } from '@arandu/laravel-mui-admin';

import { LaravelMuiAdminPlugin } from '@arandu/laravel-mui-admin/lib/types/plugin';

const DropzoneInputPlugin: LaravelMuiAdminPlugin = {

    macros: () => {

        addFilter('', () => {
            
        });

    },

};

export default DropzoneInputPlugin;