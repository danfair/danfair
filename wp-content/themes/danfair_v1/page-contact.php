<?php 
    update_option('current_page_template','contact-page');
    get_header();
    the_post();
?>
    <section class="page-sub-header contact-bg">
        <div class="page-sub-header__text max-width-wrapper">
            <h1><?php the_title(); ?></h1>
        </div>
    </section>
    <section class="page-content contact-section">
        <div class="content-wrapper max-width-wrapper">
            <h2>I'd love to hear from you!</h2>
            <?php the_content(); ?>
            <aside class="sidebar sidebar--contact">
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
        </div>
    </section>
<?php get_footer(); ?>