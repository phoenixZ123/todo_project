import React from 'react'

export const Remain = ({ RemainingCount, CheckAll }) => {

    
    return (
        <div> <div className="check-all-container">
            <div>
                <div className="button" onClick={CheckAll}>Check All</div>
            </div>

            <span>{RemainingCount} item{RemainingCount > 1 ? 's' : ''} remaining</span>
        </div></div>
    )
}
