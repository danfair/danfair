<?php 
    update_option('current_page_template','error-page');
    get_header();
    the_post();
?>
    <section class="page-sub-header about-bg">
        <div class="page-sub-header__text max-width-wrapper">
            <h1>404 ERROR: UGH</h1>
        </div>
    </section>
    <section class="page-content error-section">
        <div class="content-wrapper max-width-wrapper">
            <div class="page-content__content-left">
                <h2>Oh no!</h2>
                <img src="<?php bloginfo('stylesheet_directory'); ?>/img/kevin-mccallister.jpg" alt="Kevin McCallister" class="error-image">
                <p>You reached this page by mistake. Sorry about that. Were you looking for any of these pages?</p>
                <ul>
                    <li><a href="<?php bloginfo('wpurl'); ?>/portfolio">Portfolio</a></li>
                    <li><a href="<?php bloginfo('wpurl'); ?>/about">About me</a></li>
                    <li><a href="<?php bloginfo('wpurl'); ?>/blog">Blog</a></li>
                    <li><a href="<?php bloginfo('wpurl'); ?>/contact">Contact</a></li>
                </ul>
            </div>
            <aside class="sidebar sidebar--contact">
                <h3>Contact info</h3>
                <div class="sidebar__email-section">
                    <h4>Email</h4>
                    <p><a href="mailto:fair.dan@gmail.com">fair.dan@gmail.com</a></p>
                </div>
                <div class="sidebar__phone-section">
                    <h4>Phone</h4>
                    <p><a href="tel:1-773-494-9100">773-494-9100</a></p>
                </div>
                <div class="sidebar__on-the-web">
                    <h4>On the web</h4>
                    <p><a href="http://www.twitter.com/sdanfair">Twitter</a></p>
                    <p><a href="http://www.github.com/danfair">GitHub</a></p>
                    <p><a href="http://www.linkedin.com/in/danfair">LinkedIn</a></p>
                </div>
            </aside>
        </div><!-- end of content-wrapper -->
    </section>
    <?php get_footer(); ?>