import React, { useState } from "react";
import type { PlasmoCSConfig } from "plasmo";
import { useMessage } from "@plasmohq/messaging/hook";

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  all_frames: true
};

const QueryTextAnywhere = () => {
    const { data } = useMessage<string, string>(async (req, res) => {
        console.log(222222, req);
    });

    const [isVisible, setIsVisible] = useState(true);

    const handleClose = () => {
        console.log("Closing the CSUI window");
        setIsVisible(false);
        // TODO: How to use backend message to handle window open/close
    };

    if (!isVisible) return null; 

    return (
        <div
            style={{
                width: '65vw',
                height: '80vh',
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                background: "white",
                color: "black",
                padding: 20,
                boxSizing: 'border-box',
                display: 'flex',
                borderRadius: '25px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.5)'
        }}>
            <div
                style={{
                    width: '50%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    // marginLeft: 30
            }}>
                <img 
                    style={{
                        maxWidth: '100%',
                        maxHeight: 'calc(100% - 40px)',
                        height: 'auto'
                    }}
                    src="https://i.pinimg.com/originals/ed/2f/c2/ed2fc295a9232181f6e8b9c9d6f1bb9e.jpg" alt="Jennie model image" 
                />
            </div>

            <div style={{
                width: '40%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div style={{
                    width: '100%',
                    height: '50%',
                    border: '2px solid black',
                    boxSizing: 'border-box', 
                    display: 'flex',
                    justifyContent: 'center', 
                    alignItems: 'center'   
                }}>
                    <h1>Size Chart</h1>
                </div>

                <div style={{
                    width: '100%',
                    height: '40%',
                    border: '2px solid black',
                    boxSizing: 'border-box',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <h1>Coupons</h1>
                </div>

            </div>
                
            <div style={{
                width: '10%',
                height: '100%',
            }}>
                <button
                    onClick={handleClose}
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        background: 'transparent',
                        border: 'none',
                        color: 'black',
                        cursor: 'pointer',
                        padding: '10px',
                        fontSize: '1.5rem'
                }}>
                    ×
                </button>
            </div>
            
            
        </div>
    );
}

export default QueryTextAnywhere;

