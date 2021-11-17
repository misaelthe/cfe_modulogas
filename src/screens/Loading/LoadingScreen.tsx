import React from 'react';
import { CircularProgress, LinearProgress } from '@material-ui/core';

export const LoadingScreen: React.FC = () => {
    return(
        <div>
          <div className="p-top10">
              <LinearProgress></LinearProgress>
          </div>
          <div className="vh-100 row m-0 text-center align-items-center justify-content-center">
            <div className="col-auto"><CircularProgress size={70} /></div>
          </div>
        </div>
    )
}
export default LoadingScreen;
