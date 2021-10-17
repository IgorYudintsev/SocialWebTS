import React, {ChangeEvent} from 'react';
type propsType = {
    status: string
    updateStatus: (status: string) => void
}

export class ProfileStatus extends React.Component <propsType> {
    state = {
        editMode: false,
        status: this.props.status
    }
    activateEditeMode = () => {
        this.setState(
            {
                editMode: true
            }
        )
    }
    deActivateEditeMode = () => {
        this.setState({
                editMode: false
            }
        )
        this.props.updateStatus(this.state.status)
    }
    onStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({
                status: event.currentTarget.value
            }
        )
    }


    componentDidUpdate = (prevProps:propsType, prevState:propsType) => {
        if (prevProps.status !== this.props.status) {
            //сравниваем старые пропсы с новыми
            this.setState({
                //новым статусом заапдейтим старый статус
                status: this.props.status
            })
        }
    }

    render() {
        return (
            <div>
                {!this.state.editMode
                    ? <span onDoubleClick={this.activateEditeMode}>
                        {this.props.status || '---'}</span>
                    : <input
                        onChange={this.onStatusChange}
                        onBlur={this.deActivateEditeMode} autoFocus={true}
                        value={this.state.status}/>
                }
            </div>
        )
    }
}