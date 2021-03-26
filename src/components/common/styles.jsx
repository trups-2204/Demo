import styled from 'styled-components';
import { Flex } from '@rebass/grid';


const StyledColumn = styled(Flex)`

`;

export const Column = ({ align, justify, direction, wrap, ...props})=>(
<StyledColumn 
    px= {[1,1,2]}
    alignItems ={ align}
    flexWrap= {wrap}
    justifyContent ={ justify}
    {...props}
/>
);