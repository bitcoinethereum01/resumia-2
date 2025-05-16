import Regular from '../../../fonts/Poppins/Poppins-Regular.ttf'
import Bold from '../../../fonts/Poppins/Poppins-Bold.ttf'
import SemiBold from '../../../fonts/Poppins/Poppins-SemiBold.ttf'
import Medium from '../../../fonts/Poppins/Poppins-Medium.ttf'
import Light from '../../../fonts/Poppins/Poppins-Light.ttf'
import {Font} from '@react-pdf/renderer'

Font.register({ family: 'Regular', src: Regular });
Font.register({ family: 'Bold', src: Bold });
Font.register({ family: 'SemiBold', src: SemiBold });
Font.register({ family: 'Medium', src: Medium });
Font.register({ family: 'Light', src: Light });