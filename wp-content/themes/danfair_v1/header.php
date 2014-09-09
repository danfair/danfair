<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=.95, minimum-scale=.95, maximum-scale=.95">
    <link rel="icon" type="image/png" href="<?php bloginfo('stylesheet_directory'); ?>/img/df_favicon.png">
    <title><?php bloginfo('name'); ?> | <?php is_front_page() ? bloginfo('description') : wp_title( '' ); ?></title>
    <link href='http://fonts.googleapis.com/css?family=Open+Sans:400italic, 400,700|Montserrat:400,700' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" type="text/css" href="<?php echo bloginfo('stylesheet_directory'); ?>/style.min.css">
    <?php wp_head(); ?>
</head> 
<body id="<?php echo get_option('current_page_template'); ?>">
    <header class="main-header">
        <nav class="max-width-wrapper main-nav">
            <a href="<?php bloginfo('wpurl'); ?>" class="df-logo">DAN FAIR</a>
            <ul class="main-header__social-icons-list">
                <li><a href="http://www.linkedin.com/in/danfair" class="social-icon linkedin"></a></li>
                <li><a href="http://www.twitter.com/sdanfair" class="social-icon twitter"></a></li>
                <li><a href="http://www.github.com/danfair" class="social-icon github"></a></li>
            </ul>
            <?php wp_nav_menu(); ?>
            <a class="main-nav__mobile-menu"></a>
        </nav>  
    </header>
    