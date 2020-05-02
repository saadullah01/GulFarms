import React, { Component} from 'react';

import RemoveAnimalTemplate from './GulFarms-master/client/src/components/RemoveAnimalTemplate';

class RemoveAnimal extends Component{
    
    render() {
        const { errors } = this.state;
        return (
                <RemoveAnimalTemplate Name="Animal Preset"></RemoveAnimalTemplate>
        )
    }
}
export default RemoveAnimal;
