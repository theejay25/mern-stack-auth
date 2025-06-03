export const verificationEmailTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div class="body">

        <div class="inner">
            <div class="nav">
                <div>
                    <h2>Cardio-Care</h2>
                </div>
            </div>

            <div class="email-body">
                <h2>Welcome to Cardio-Care</h2>
                <p class="body-text">We at Cardio-Care are happy to have you, thank you for joining us. Please verify your email with this token </p>
                <h2>Verification Token</h2>

                <h2 class="token">{verificationToken}</h2>

            </div>
        </div>

    </div>
</body>


<style>

    * {
        font-family: Arial, Helvetica, sans-serif;
    }

    .body{
        display: flex;
        width: 100dvw;
        height: 100dvh;
        justify-content: center;
        align-items: center;
        background: #fcfcf8;
    }

    .inner{
        background: #fbf7f8;
        border: lightgray 8px solid ;
        border-radius: 5px;
         display: flex;

        justify-content: space-around;
        align-items: center;
        flex-direction: column;
    }

    .nav{
          display: flex;
        justify-content: center;
        align-items: center;
        height: 5vh;
        width: 100%;
        background: rgb(161, 161, 240);
        padding: 5px;
        padding-top: 7px;
        padding-bottom: 7px;
    }

    .email-body {
             display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: column;
        padding-left: 7px;
        padding-right: 7px;
    }

    .body-text {
        margin-top: 0;
        max-width: 250px;
    }

    .text {
        max-width: auto;
        letter-spacing: 5px;
    }
</style>
</html>
`

export const welcomeEmailTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div class="body">

        <div class="inner">
            <div class="nav">
                <div>
                    <h2>Cardio-Care</h2>
                </div>
            </div>

            <div class="email-body">
                <h2>Welcome to Cardio-Care</h2>
                <p class="body-text">We at Cardio-Care are happy to have you <i>{name}</i>, thank you for joining us! We hope you find our services to your liking. Feel free to use our customer care services for your complaints</p>
                <h1>Welcome!</h1>
            </div>
        </div>

    </div>
</body>


<style>

    * {
        font-family: Arial, Helvetica, sans-serif;
    }

    .body{
        display: flex;
        width: 100dvw;
        height: 100dvh;
        justify-content: center;
        align-items: center;
        background: #fcfcf8;
    }

    .inner{
        background: #fbf7f8;
        border: lightgray 8px solid ;
        border-radius: 5px;
         display: flex;

        justify-content: space-around;
        align-items: center;
        flex-direction: column;
    }

    .nav{
          display: flex;
        justify-content: center;
        align-items: center;
        height: 5vh;
        width: 100%;
        background: rgb(161, 161, 240);
        padding: 5px;
        padding-top: 7px;
        padding-bottom: 7px;
    }

    .email-body {
             display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: column;
        padding-left: 7px;
        padding-right: 7px;
    }

    .body-text {
        margin-top: 0;
        max-width: 250px;
    }

    .text {
        max-width: auto;
        letter-spacing: 5px;
    }
</style>
</html>
`