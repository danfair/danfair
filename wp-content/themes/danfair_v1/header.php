<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width">
    <link rel="icon" type="image/png" href="<?php bloginfo('stylesheet_directory'); ?>/img/df.png">
    <title><?php wp_title ( '|', true,'right' ); ?></title>
    <link href='http://fonts.googleapis.com/css?family=Open+Sans:400italic, 400,700|Montserrat:400,700' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" type="text/css" href="<?php echo bloginfo('stylesheet_directory'); ?>/style.css">
    <?php wp_head(); ?>
</head> 
<body>
    <header class="main-header">
        <nav class="max-width-wrapper main-nav">
            <a class="df-logo">DAN FAIR</a>
            <?php wp_nav_menu(); ?>
            <ul class="main-header__social-icons-list">
                <li><a href="http://www.linkedin.com/in/danfair" class="social-icon linkedin"></a></li>
                <li><a href="http://www.twitter.com/sdanfair" class="social-icon twitter"></a></li>
                <li><a href="http://www.github.com/danfair" class="social-icon github"></a></li>
            </ul>
        </nav>  
    </header>
    