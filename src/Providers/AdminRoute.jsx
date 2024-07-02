import { Navigate } from "react-router-dom";
import useUserRole from "../components/useUserRole";
import { Avatar, Card, CardContent, CardHeader, CardMedia, IconButton, Skeleton, Typography } from "@mui/material";
import React from "react";

const AdminRoute = ({children}) => {
    const [userRole, isLoading] = useUserRole();


    if (isLoading) {
        return <>
          <Card sx={{ maxWidth: 345, m: 2 }} style={{ textAlign: "center", margin: 'auto', marginTop: '150px' }}>
            <CardHeader
              avatar={
                isLoading ? (
                  <Skeleton animation="wave" variant="circular" width={40} height={40} />
                ) : (
                  <Avatar
                    alt="Ted talk"
                    src="https://pbs.twimg.com/profile_images/877631054525472768/Xp5FAPD5_reasonably_small.jpg"
                  />
                )
              }
              action={
                isLoading ? null : (
                  <IconButton aria-label="settings">
                    {/* <MoreVertIcon /> */}
                  </IconButton>
                )
              }
              title={
                isLoading ? (
                  <Skeleton
                    animation="wave"
                    height={10}
                    width="80%"
                    style={{ marginBottom: 6 }}
                  />
                ) : (
                  'Ted'
                )
              }
              subheader={
                isLoading ? (
                  <Skeleton animation="wave" height={10} width="40%" />
                ) : (
                  '5 hours ago'
                )
              }
            />
            {isLoading ? (
              <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
            ) : (
              <CardMedia
                component="img"
                height="140"
                image="https://pi.tedcdn.com/r/talkstar-photos.s3.amazonaws.com/uploads/72bda89f-9bbf-4685-910a-2f151c4f3a8a/NicolaSturgeon_2019T-embed.jpg?w=512"
                alt="Nicola Sturgeon on a TED talk stage"
              />
            )}
    
            <CardContent>
              {isLoading ? (
                <React.Fragment>
                  <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                  <Skeleton animation="wave" height={10} width="80%" />
                </React.Fragment>
              ) : (
                <Typography variant="body2" color="text.secondary" component="p">
                  {
                    "Why First Minister of Scotland Nicola Sturgeon thinks GDP is the wrong measure of a country's success:"
                  }
                </Typography>
              )}
            </CardContent>
          </Card>
        </>
      }
    
      if (userRole === 'admin') {
        return children;
      }
    
    
      return <Navigate to={'/dashboard'}></Navigate>
    };

export default AdminRoute;