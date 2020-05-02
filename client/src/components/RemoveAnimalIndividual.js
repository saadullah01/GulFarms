import React, { Component} from 'react';

import RemoveAnimalTemplate from './GulFarms-master/client/src/components/RemoveAnimalTemplate';

class RemoveAnimalIndividual extends Component{
    
    render() {
        const { errors } = this.state;
        return (
                <RemoveAnimalTemplate Name="Animal"></RemoveAnimalTemplate>
        )
    }
}
export default RemoveAnimalIndividual;